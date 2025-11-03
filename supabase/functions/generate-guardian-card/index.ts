import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, result, question } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Generating guardian card for category:', category);

    // Create category-specific card style prompts
    const styleMap: Record<string, string> = {
      '事业运势': 'Traditional Chinese painting style, elegant scholar or warrior figure in traditional robes, holding ancient scrolls or sword, surrounded by golden auspicious clouds, fortune symbols like coins and official seals, professional energy, career success symbols, warm golden and red color palette, ornate decorative border with traditional Chinese patterns',
      '情感婚姻': 'Traditional Chinese painting style, graceful figures in flowing traditional hanfu, pink peony flowers, mandarin ducks symbolizing love, red thread of fate, romantic moonlight, cherry blossoms, soft pink and rose gold color palette, elegant decorative border with love knot patterns',
      '健康养生': 'Traditional Chinese painting style, serene meditation figure, bamboo and pine trees symbolizing vitality, crane bird representing longevity, flowing qi energy visualization, five elements symbols, healing herbs, calming green and jade color palette, natural decorative border with botanical patterns',
      '风水布局': 'Traditional Chinese painting style, Bagua diagram, yin-yang symbol with radiating golden light rays, feng shui compass (Luopan), harmonious landscape with mountains and water, flowing energy lines, mystical architectural elements, balanced earth tones with golden accents, geometric decorative border with feng shui symbols',
      '综合占卜': 'Traditional Chinese painting style, mystical sage figure with flowing robes, cosmic yin-yang symbol radiating divine light, I-Ching hexagram patterns, ancient oracle bones, celestial stars and moon, universal balance symbols, purple and gold cosmic color palette, ornate decorative border with celestial patterns'
    };

    const cardStyle = styleMap[category] || styleMap['综合占卜'];
    
    // Create a detailed prompt that incorporates the divination result
    const detailedPrompt = `Create a protective guardian card (守护牌) in the style of: ${cardStyle}.

The card should embody the essence of this divination reading: "${result.overview || result.analysis}".

The card must have:
- A vertical card format (aspect ratio 2:3)
- Traditional Chinese artistic elements with modern mystical aesthetics
- Ornate decorative border with traditional patterns
- Small red seal stamp (印章) in the corner
- Subtle paper texture resembling aged parchment
- Main symbolic imagery that represents protection and guidance
- Harmonious color composition
- Elegant calligraphic feel
- Mystical and auspicious atmosphere

Ultra high resolution, professional art quality, suitable for a protective talisman card.`;

    console.log('Sending request to Lovable AI with prompt');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: detailedPrompt
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: '请求过于频繁，请稍后再试' }), 
          { 
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: '需要充值额度，请联系管理员' }), 
          { 
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received response from Lovable AI');
    
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      throw new Error('No image generated');
    }

    return new Response(
      JSON.stringify({ imageUrl }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in generate-guardian-card:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An error occurred generating the guardian card'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});