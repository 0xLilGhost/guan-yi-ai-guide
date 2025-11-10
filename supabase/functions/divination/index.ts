const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DivinationRequest {
  category: string;
  question: string;
  language?: string;
  birthData: {
    year?: string;
    month?: string;
    day?: string;
    hour?: string;
    minute?: string;
    gender?: string;
  };
  divineData?: {
    method?: 'time' | 'number';
    number1?: number;
    number2?: number;
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, question, language = 'zh', birthData, divineData }: DivinationRequest = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Divination request:', { category, question, hasBirthData: !!birthData.year, divineMethod: divineData?.method });

    // 计算真实的梅花易数卦象
    const calculateHexagram = () => {
      const trigrams = ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤'];
      let upperNum: number, lowerNum: number, changingLine: number;

      if (divineData?.method === 'number' && divineData.number1 && divineData.number2) {
        upperNum = ((divineData.number1 - 1) % 8) + 1;
        lowerNum = ((divineData.number2 - 1) % 8) + 1;
        changingLine = ((divineData.number1 + divineData.number2 - 1) % 6) + 1;
      } else {
        const now = new Date();
        const year = birthData.year ? parseInt(birthData.year) : now.getFullYear();
        const month = birthData.month ? parseInt(birthData.month) : now.getMonth() + 1;
        const day = birthData.day ? parseInt(birthData.day) : now.getDate();
        const hour = birthData.hour ? parseInt(birthData.hour) : now.getHours();
        const minute = birthData.minute ? parseInt(birthData.minute) : now.getMinutes();
        
        upperNum = ((year + month + day + minute - 1) % 8) + 1;
        lowerNum = ((year + month + day + hour + minute - 1) % 8) + 1;
        changingLine = ((year + month + day + hour + minute - 1) % 6) + 1;
      }

      const upperTrigram = trigrams[upperNum - 1];
      const lowerTrigram = trigrams[lowerNum - 1];
      
      // 计算变卦
      const resultUpperNum = changingLine <= 3 ? ((lowerNum % 8) + 1) : upperNum;
      const resultLowerNum = changingLine > 3 ? ((upperNum % 8) + 1) : lowerNum;
      const resultTrigram = `${trigrams[resultUpperNum - 1]}${trigrams[resultLowerNum - 1]}`;

      return {
        upper: upperTrigram,
        lower: lowerTrigram,
        changing: changingLine,
        result: resultTrigram,
        interpretation: `本卦${upperTrigram}上${lowerTrigram}下，第${changingLine}爻动，变为${resultTrigram}卦`
      };
    };

    // 计算奇门遁甲盘局
    const calculateQimen = () => {
      const palaces = ['中宫', '乾宫', '坎宫', '艮宫', '震宫', '巽宫', '离宫', '坤宫', '兑宫'];
      const gates = ['开门', '休门', '生门', '伤门', '杜门', '景门', '死门', '惊门'];
      const stars = ['天蓬', '天任', '天冲', '天辅', '天英', '天芮', '天柱', '天心', '天禽'];
      const directions = ['东方', '南方', '西方', '北方', '东南方', '西南方', '东北方', '西北方'];

      const now = new Date();
      const hour = birthData.hour ? parseInt(birthData.hour) : now.getHours();
      const minute = birthData.minute ? parseInt(birthData.minute) : now.getMinutes();
      const day = birthData.day ? parseInt(birthData.day) : now.getDate();
      
      const palaceIndex = (day + hour + minute) % 9;
      const gateIndex = (day * 2 + hour + minute) % 8;
      const starIndex = (day + hour * 3 + minute) % 9;
      const directionIndex = (day + hour + minute) % 8;

      return {
        palace: palaces[palaceIndex],
        gate: gates[gateIndex],
        star: stars[starIndex],
        direction: `${directions[directionIndex]}大吉`,
        timing: `当前时辰${gates[gateIndex]}当值，宜行动决策`
      };
    };

    const hexagramData = (category === '梅花易数' || category === '综合占卜') ? calculateHexagram() : null;
    const qimenData = (category === '奇门遁甲' || category === '综合占卜') && birthData.day ? calculateQimen() : null;

    // Build system prompt based on category and language
    const isEnglish = language === 'en';
    
    const systemPrompts = isEnglish ? {
      'Career Fortune': `You are a master of Chinese divination including Plum Blossom Numerology, Qimen Dunjia, and Ziwei Doushu. Focus on career development, workplace decisions, and investment timing.
Analysis dimensions:
- Plum Blossom Numerology: Analyze trends and timing through hexagrams
- Qimen Dunjia: Determine auspicious and inauspicious directions and timing
- Ziwei Doushu: Analyze Career Palace and Wealth Palace for career potential
Provide specific, actionable advice based on traditional divination logic combined with modern workplace environment.`,

      'Love & Marriage': `You are an emotional divination master proficient in Ziwei Doushu and Plum Blossom Numerology. Focus on compatibility, relationship trends, and marriage harmony.
Analysis dimensions:
- Ziwei Doushu: Analyze Marriage Palace and Fortune Palace for relationship patterns
- Plum Blossom Numerology: Read relationship trends and key timing through hexagrams
- Five Elements: Analyze compatibility between partners
Provide warm, practical guidance to help understand and improve relationships.`,

      'Health & Wellness': `You are a health advisor proficient in Ziwei Doushu, Five Elements theory, and Traditional Chinese Medicine.
Analysis dimensions:
- Ziwei Doushu: Analyze Health Palace and Parent Palace for health vulnerabilities
- Five Elements: Identify body parts prone to issues through Bazi analysis
- Annual Fortune: Analyze current health trends
Combine TCM wisdom with modern health concepts to provide actionable wellness advice.`,

      'Feng Shui Layout': `You are a Feng Shui master proficient in Eight Mansions, Flying Stars, and Compass Feng Shui.
Analysis dimensions:
- Eight Mansions: Determine house-life compatibility, identify four auspicious and four inauspicious directions
- Flying Stars: Analyze temporal star influences on space
- Form and Qi: Assess external environment and internal layout
Provide specific layout adjustment plans including directions, ornaments, colors, etc.`,

      'General Divination': `You are an all-around divination master proficient in Plum Blossom Numerology, Ziwei Doushu, Qimen Dunjia, Feng Shui, and Taiyi Shenshu.
Apply the most suitable divination system based on the question:
- Plum Blossom: Quick fortune-telling for all matters
- Qimen Dunjia: Major decisions and timing selection
- Ziwei Doushu: Life patterns and destiny
- Feng Shui: Environmental energy and spatial layout
- Taiyi Shenshu: National fortune and strategic planning
Provide comprehensive guidance through integrated analysis.`,
    } : {
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

    const systemPrompt = systemPrompts[category as keyof typeof systemPrompts] || systemPrompts[isEnglish ? 'General Divination' : '综合占卜'];

    // Build user prompt based on language
    let userPrompt = isEnglish 
      ? `Question: ${question}\n\n` 
      : `问题：${question}\n\n`;
    
    if (birthData.year && birthData.month && birthData.day) {
      if (isEnglish) {
        userPrompt += `Birth Information:\n`;
        userPrompt += `- Birth Date: ${birthData.year}-${birthData.month}-${birthData.day}\n`;
        if (birthData.hour) {
          userPrompt += `- Birth Time: ${birthData.hour}:${birthData.minute || '00'}\n`;
        }
        userPrompt += `- Gender: ${birthData.gender === 'male' ? 'Male' : 'Female'}\n\n`;
        userPrompt += `Please provide precise analysis based on the birth information above.\n\n`;
      } else {
        userPrompt += `生辰信息：\n`;
        userPrompt += `- 出生日期：${birthData.year}年${birthData.month}月${birthData.day}日\n`;
        if (birthData.hour) {
          userPrompt += `- 出生时间：${birthData.hour}时`;
          if (birthData.minute) {
            userPrompt += `${birthData.minute}分`;
          }
          userPrompt += `\n`;
        }
        userPrompt += `- 性别：${birthData.gender === 'male' ? '男' : '女'}\n\n`;
        userPrompt += `请基于以上生辰信息进行精准分析。\n\n`;
      }
    } else {
      userPrompt += isEnglish 
        ? `(No birth information provided, please analyze based on the question itself and general principles)\n\n`
        : `（用户未提供生辰信息，请基于问题本身和通用规律进行分析）\n\n`;
    }

    // Add hexagram and qimen data if available
    if (hexagramData) {
      userPrompt += isEnglish
        ? `\nActual Hexagram Data:\n- Original: ${hexagramData.upper} above ${hexagramData.lower} below\n- Changing Line: Line ${hexagramData.changing}\n- Transformed: ${hexagramData.result}\nPlease interpret based on this hexagram.\n`
        : `\n真实卦象数据：\n- 本卦：${hexagramData.upper}上${hexagramData.lower}下\n- 变爻：第${hexagramData.changing}爻\n- 变卦：${hexagramData.result}\n请基于此卦象进行解读。\n`;
    }
    if (qimenData) {
      userPrompt += isEnglish
        ? `\nActual Qimen Chart:\n- Palace: ${qimenData.palace}\n- Gate: ${qimenData.gate}\n- Star: ${qimenData.star}\n- Auspicious Direction: ${qimenData.direction}\nPlease interpret based on this chart.\n`
        : `\n真实奇门盘局：\n- 宫位：${qimenData.palace}\n- 值使门：${qimenData.gate}\n- 值符星：${qimenData.star}\n- 吉方：${qimenData.direction}\n请基于此盘局进行解读。\n`;
    }

    userPrompt += isEnglish 
      ? `Please output results in the following JSON structure:
{
  "overview": "Overall fortune summary (2-3 sentences)",
  "analysis": "Detailed analysis (including divination logic, 300-500 words)",
  "reasoning": "Reasoning explanation (explain which divination methods were used and how conclusions were reached, 150-300 words)",
  "suggestions": [
    "Specific suggestion 1 (actionable guidance)",
    "Specific suggestion 2",
    "Specific suggestion 3"
  ],
  "probability": "Accuracy assessment (e.g., Reference level 75-80%)",
  "visualData": {
    "bazi": ${birthData.year && birthData.month && birthData.day ? `{
      "year": { "heavenlyStem": "Yearly stem", "earthlyBranch": "Yearly branch", "element": "Year pillar element" },
      "month": { "heavenlyStem": "Monthly stem", "earthlyBranch": "Monthly branch", "element": "Month pillar element" },
      "day": { "heavenlyStem": "Daily stem", "earthlyBranch": "Daily branch", "element": "Day pillar element" },
      "hour": { "heavenlyStem": "Hourly stem", "earthlyBranch": "Hourly branch", "element": "Hour pillar element" },
      "dayMaster": "Day master element",
      "elementBalance": { "wood": value, "fire": value, "earth": value, "metal": value, "water": value }
    }` : 'null'},
    "hexagram": ${hexagramData ? JSON.stringify(hexagramData) : 'null'},
    "qimen": ${qimenData ? JSON.stringify(qimenData) : 'null'},
    "ziwei": ${(category === 'Love & Marriage' || category === 'Career Fortune' || category === 'General Divination') && birthData.year ? `{
      "mainStar": "Main star (Ziwei/Tianji/Taiyang/Wuqu/Tiantong/Lianzhen, etc.)",
      "palace": "Life palace position",
      "keyPalaces": {
        "career": "Career palace main star and fortune",
        "wealth": "Wealth palace main star and fortune",
        "relationship": "Marriage palace main star and fortune",
        "health": "Health palace main star and fortune"
      }
    }` : 'null'},
    "fengshui": ${category === 'Feng Shui' || category === 'General Divination' ? `{
      "favorableDirection": ["East", "South"],
      "unfavorableDirection": ["Northwest"],
      "suggestions": {
        "color": "Recommended colors (e.g., cyan, green)",
        "element": "Elements to enhance (e.g., wood, fire)",
        "placement": "Important placement suggestions (within 100 words)"
      }
    }` : 'null'}
  }
}

Requirements:
1. Combine traditional divination logic with modern practical situations
2. Suggestions must be specific and actionable
3. Explain the reasoning process clearly so users understand the logic
4. Use professional but accessible language, avoid being overly mystical
5. Must return valid JSON format
6. Generate authentic divination data in visualData based on category and birth information, set to null if cannot generate
7. ALL TEXT MUST BE IN ENGLISH`
      : `请按以下结构输出结果（使用JSON格式）：
{
  "overview": "总体运势概述（2-3句话）",
  "analysis": "详细分析（包含术数逻辑推演，300-500字）",
  "reasoning": "推演逻辑说明（解释使用了哪些术数方法，如何得出结论，150-300字）",
  "suggestions": [
    "具体建议1（可执行的行动指引）",
    "具体建议2",
    "具体建议3"
  ],
  "probability": "准确度评估（如：参考度 75-80%）",
  "visualData": {
    "bazi": ${birthData.year && birthData.month && birthData.day ? `{
      "year": { "heavenlyStem": "年干", "earthlyBranch": "年支", "element": "年柱五行" },
      "month": { "heavenlyStem": "月干", "earthlyBranch": "月支", "element": "月柱五行" },
      "day": { "heavenlyStem": "日干", "earthlyBranch": "日支", "element": "日柱五行" },
      "hour": { "heavenlyStem": "时干", "earthlyBranch": "时支", "element": "时柱五行" },
      "dayMaster": "日主五行",
      "elementBalance": { "wood": 数值, "fire": 数值, "earth": 数值, "metal": 数值, "water": 数值 }
    }` : 'null'},
    "hexagram": ${hexagramData ? JSON.stringify(hexagramData) : 'null'},
    "qimen": ${qimenData ? JSON.stringify(qimenData) : 'null'},
    "ziwei": ${(category === '情感婚姻' || category === '事业运势' || category === '综合占卜') && birthData.year ? `{
      "mainStar": "主星（紫微/天机/太阳/武曲/天同/廉贞等）",
      "palace": "命宫位置",
      "keyPalaces": {
        "career": "官禄宫主星及吉凶",
        "wealth": "财帛宫主星及吉凶",
        "relationship": "夫妻宫主星及吉凶",
        "health": "疾厄宫主星及吉凶"
      }
    }` : 'null'},
    "fengshui": ${category === '风水布局' || category === '综合占卜' ? `{
      "favorableDirection": ["东方", "南方"],
      "unfavorableDirection": ["西北方"],
      "suggestions": {
        "color": "建议颜色（如：青色、绿色）",
        "element": "补充五行（如：木、火）",
        "placement": "重要摆设建议（100字以内）"
      }
    }` : 'null'}
  }
}

要求：
1. 结合传统术数逻辑和现代实际情况
2. 给出的建议必须具体、可执行
3. 解释清楚推演过程，让用户理解逻辑
4. 语言要专业但易懂，避免过于玄虚
5. 必须返回有效的JSON格式
6. visualData中根据类别和生辰信息生成真实的术数推演数据，如果无法生成则对应项设为null
7. 所有文本必须使用中文`;

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
