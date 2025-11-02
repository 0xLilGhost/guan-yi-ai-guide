const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DivinationRequest {
  category: string;
  question: string;
  birthData: {
    year?: string;
    month?: string;
    day?: string;
    hour?: string;
    gender?: string;
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, question, birthData }: DivinationRequest = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Divination request:', { category, question, hasBirthData: !!birthData.year });

    // Build system prompt based on category
    const systemPrompts = {
      '事业运势': `你是精通梅花易数、奇门遁甲和紫微斗数的命理大师。专注于事业发展、职场决策和投资时机分析。
分析维度：
- 梅花易数：通过起卦分析事态走向和时机选择
- 奇门遁甲：判断方位、时间的吉凶，决策时机
- 紫微斗数：分析命盘中的官禄宫、财帛宫，看事业发展潜力
请基于传统术数逻辑，结合现代职场环境，给出具体可行的建议。`,

      '情感婚姻': `你是精通紫微斗数和梅花易数的情感命理师。专注于姻缘配对、情感走向和婚姻和合分析。
分析维度：
- 紫微斗数：分析夫妻宫、福德宫，看感情模式和配对
- 梅花易数：通过卦象看感情发展趋势和关键时机
- 五行相生相克：分析双方是否相合
请给出温暖、实用的情感指引，帮助理解和改善关系。`,

      '健康养生': `你是精通紫微斗数、五行学说和中医养生的健康顾问。
分析维度：
- 紫微斗数：看疾厄宫、父母宫，判断健康弱点
- 五行分析：通过八字五行偏枯，找出身体易出问题的部位
- 流年大运：分析当前时段的健康趋势
请结合中医养生智慧和现代健康理念，给出可执行的调理建议。`,

      '风水布局': `你是精通八宅风水、玄空飞星和罗盘风水的风水大师。
分析维度：
- 八宅风水：判断宅命是否相配，找出四吉方和四凶方
- 玄空飞星：分析时间飞星对空间的影响
- 峦头理气：看外部环境和内部格局
请给出具体的布局调整方案，包括方位、摆件、颜色等实用建议。`,

      '综合占卜': `你是精通梅花易数、紫微斗数、奇门遁甲、风水学和太乙神数的全能命理师。
根据问题性质，灵活运用最合适的术数系统：
- 梅花易数：万事万物皆可起卦，快速判断吉凶
- 奇门遁甲：重大决策、选择时机
- 紫微斗数：人生格局、性格命运
- 风水学：环境气场、空间布局
- 太乙神数：国运、大势、战略布局
请综合分析，给出全面的指引。`,
    };

    const systemPrompt = systemPrompts[category as keyof typeof systemPrompts] || systemPrompts['综合占卜'];

    // Build user prompt
    let userPrompt = `问题：${question}\n\n`;
    
    if (birthData.year && birthData.month && birthData.day) {
      userPrompt += `生辰信息：\n`;
      userPrompt += `- 出生日期：${birthData.year}年${birthData.month}月${birthData.day}日\n`;
      if (birthData.hour) {
        userPrompt += `- 出生时辰：${birthData.hour}时\n`;
      }
      userPrompt += `- 性别：${birthData.gender === 'male' ? '男' : '女'}\n\n`;
      userPrompt += `请基于以上生辰信息进行精准分析。\n\n`;
    } else {
      userPrompt += `（用户未提供生辰信息，请基于问题本身和通用规律进行分析）\n\n`;
    }

    userPrompt += `请按以下结构输出结果（使用JSON格式）：
{
  "overview": "总体运势概述（2-3句话）",
  "analysis": "详细分析（包含术数逻辑推演，300-500字）",
  "reasoning": "推演逻辑说明（解释使用了哪些术数方法，如何得出结论，150-300字）",
  "suggestions": [
    "具体建议1（可执行的行动指引）",
    "具体建议2",
    "具体建议3"
  ],
  "probability": "准确度评估（如：参考度 75-80%）"
}

要求：
1. 结合传统术数逻辑和现代实际情况
2. 给出的建议必须具体、可执行
3. 解释清楚推演过程，让用户理解逻辑
4. 语言要专业但易懂，避免过于玄虚
5. 必须返回有效的JSON格式`;

    // Call AI
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiMessage = aiData.choices[0].message.content;

    console.log('AI response received, length:', aiMessage.length);

    // Parse JSON from AI response
    let result;
    try {
      // Try to find JSON in the response
      const jsonMatch = aiMessage.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON found, create structured response from text
        result = {
          overview: aiMessage.substring(0, 200) + '...',
          analysis: aiMessage,
          reasoning: '基于传统术数逻辑和AI分析综合得出',
          suggestions: ['请仔细阅读详细分析', '结合实际情况判断', '如需更精准分析请提供完整生辰信息'],
          probability: '参考度 70-75%'
        };
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Fallback to text-based response
      result = {
        overview: '基于您的问题进行了综合分析',
        analysis: aiMessage,
        reasoning: '综合运用传统术数智慧进行推演',
        suggestions: ['请仔细阅读详细分析内容', '建议结合实际情况判断', '可多次占卜参考'],
        probability: '参考度 70%'
      };
    }

    return new Response(
      JSON.stringify({ result }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Divination function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: 'Please try again later'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
