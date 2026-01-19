# AI Providers Guide

Complete guide for choosing and configuring AI providers for your resume chatbot.

## Table of Contents

1. [Provider Comparison](#provider-comparison)
2. [Groq (Reference Implementation)](#groq-reference-implementation)
3. [OpenAI](#openai)
4. [Anthropic (Claude)](#anthropic-claude)
5. [Google Gemini](#google-gemini)
6. [Azure OpenAI](#azure-openai)
7. [Open Source (Ollama)](#open-source-ollama)
8. [Configuration Guide](#configuration-guide)
9. [Cost Optimization](#cost-optimization)
10. [Switching Providers](#switching-providers)

## API Key Configuration

**Simplified Setup:** This template uses a generic `AI_API_KEY` environment variable that works with all providers. Set it in `backend/.env`:

```bash
AI_API_KEY=your_api_key_here
AI_PROVIDER=groq  # or openai, google, anthropic
```

Provider-specific keys (e.g., `GROQ_API_KEY`, `OPENAI_API_KEY`) are also supported for backward compatibility or when managing multiple providers simultaneously.

## Provider Comparison

| Provider | Free Tier | Cost | Speed | Quality | Best For |
|----------|-----------|------|-------|---------|----------|
| **Groq** | ✅ High limit | Free | ⚡ Fastest | Good | Reference (recommended) |
| **OpenAI** | ⚠️ $5 credit | $0.01-0.06/1K | Fast | Excellent | Production, quality |
| **Anthropic** | ❌ No | $0.01-0.08/1K | Fast | Excellent | Long conversations |
| **Google Gemini** | ✅ Generous | Free/Pay | Fast | Very Good | Free production use |
| **Azure OpenAI** | ❌ No | Enterprise | Fast | Excellent | Enterprise compliance |
| **Ollama** | ✅ Free | Self-host | Slow | Good | Privacy, offline |

### Recommendation

**For getting started:** Use **Groq** (reference implementation)
- Generous free tier
- Extremely fast responses
- Good quality for resume Q&A
- Easy setup
- No credit card required

**For production:** Consider **OpenAI GPT-4** or **Google Gemini**
- Higher quality responses
- More context understanding
- Better conversation flow
- Reasonable costs for resume sites

## Groq (Reference Implementation)

Groq provides ultra-fast inference with generous free limits.

### Setup

1. **Get API Key:**
   - Visit [console.groq.com](https://console.groq.com)
   - Sign up (free, no credit card)
   - Go to API Keys
   - Create new key

2. **Configure:**

In `config.json`:
```json
{
  "ai": {
    "provider": "groq",
    "model": "llama-3.3-70b-versatile",
    "temperature": 0.7,
    "maxTokens": 1024
  }
}
```

In `backend/.env`:
```bash
# Generic API key (works for all providers)
AI_API_KEY=gsk_your_api_key_here
AI_PROVIDER=groq
AI_MODEL=llama-3.3-70b-versatile

# Alternatively, use provider-specific key:
# GROQ_API_KEY=gsk_your_api_key_here
```

### Available Models

| Model | Context | Speed | Best For |
|-------|---------|-------|----------|
| `llama-3.3-70b-versatile` | 128K | Very Fast | General chat (recommended) |
| `llama-3.1-70b-versatile` | 128K | Very Fast | Alternative |
| `mixtral-8x7b-32768` | 32K | Ultra Fast | Quick responses |

### Limits

- **Free Tier:** 30 requests/minute, ~14,400/day
- **Rate Limit:** Very generous for personal sites
- **Context:** Up to 128K tokens

### Pros & Cons

**Pros:**
- ✅ Fastest inference available
- ✅ Generous free tier
- ✅ Good quality for Q&A
- ✅ Easy to set up

**Cons:**
- ⚠️ Not as advanced as GPT-4
- ⚠️ Smaller model selection
- ⚠️ Newer service

## OpenAI

Industry-leading AI models with excellent quality.

### Setup

1. **Get API Key:**
   - Visit [platform.openai.com](https://platform.openai.com)
   - Sign up ($5 free credit for new users)
   - Go to API Keys
   - Create new key
   - Add payment method for continued use

2. **Configure:**

In `config.json`:
```json
{
  "ai": {
    "provider": "openai",
    "model": "gpt-4o-mini",
    "temperature": 0.7,
    "maxTokens": 1024
  }
}
```

In `backend/.env`:
```bash
# Generic API key (works for all providers)
AI_API_KEY=sk-your_api_key_here
AI_PROVIDER=openai
AI_MODEL=gpt-4o-mini

# Alternatively, use provider-specific key:
# OPENAI_API_KEY=sk-your_api_key_here
```

### Recommended Models

| Model | Cost (per 1K tokens) | Speed | Best For |
|-------|---------------------|-------|----------|
| `gpt-4o-mini` | $0.00015 / $0.0006 | Fast | Cost-effective (recommended) |
| `gpt-4o` | $0.0025 / $0.01 | Fast | Highest quality |
| `gpt-3.5-turbo` | $0.0005 / $0.0015 | Very Fast | Budget option |

*Pricing: Input / Output tokens*

### Cost Estimate

For a resume site with 1,000 conversations/month:
- **gpt-4o-mini:** ~$5-10/month
- **gpt-4o:** ~$25-50/month
- **gpt-3.5-turbo:** ~$2-5/month

### Pros & Cons

**Pros:**
- ✅ Best quality responses
- ✅ Excellent reasoning
- ✅ Regular model updates
- ✅ Reliable uptime

**Cons:**
- ❌ No free tier (after $5 credit)
- ❌ More expensive than alternatives
- ⚠️ Requires payment method

## Anthropic (Claude)

Advanced AI focused on safety and long conversations.

### Setup

1. **Get API Key:**
   - Visit [console.anthropic.com](https://console.anthropic.com)
   - Sign up
   - Add payment method (no free tier)
   - Create API key

2. **Configure:**

In `config.json`:
```json
{
  "ai": {
    "provider": "anthropic",
    "model": "claude-3-5-sonnet-20241022",
    "temperature": 0.7,
    "maxTokens": 1024
  }
}
```

In `backend/.env`:
```bash
# Generic API key (works for all providers)
AI_API_KEY=sk-ant-your_api_key_here
AI_PROVIDER=anthropic
AI_MODEL=claude-3-5-sonnet-20241022

# Alternatively, use provider-specific key:
# ANTHROPIC_API_KEY=sk-ant-your_api_key_here
```

### Recommended Models

| Model | Cost (per 1K tokens) | Context | Best For |
|-------|---------------------|---------|----------|
| `claude-3-5-sonnet-20241022` | $0.003 / $0.015 | 200K | Best balance (recommended) |
| `claude-3-5-haiku-20241022` | $0.001 / $0.005 | 200K | Fast, cheap |
| `claude-3-opus-20240229` | $0.015 / $0.075 | 200K | Highest quality |

### Cost Estimate

For 1,000 conversations/month:
- **Haiku:** ~$3-8/month
- **Sonnet:** ~$10-20/month
- **Opus:** ~$50-100/month

### Pros & Cons

**Pros:**
- ✅ Excellent at long conversations
- ✅ Strong reasoning capabilities
- ✅ Large context windows (200K)
- ✅ Good for nuanced responses

**Cons:**
- ❌ No free tier
- ❌ More expensive
- ⚠️ Smaller model selection

## Google Gemini

Google's multimodal AI with generous free tier.

### Setup

1. **Get API Key:**
   - Visit [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Sign in with Google account
   - Create API key (free)

2. **Configure:**

In `config.json`:
```json
{
  "ai": {
    "provider": "google",
    "model": "gemini-1.5-flash",
    "temperature": 0.7,
    "maxTokens": 1024
  }
}
```

In `backend/.env`:
```bash
# Generic API key (works for all providers)
AI_API_KEY=your_api_key_here
AI_PROVIDER=google
AI_MODEL=gemini-1.5-flash

# Alternatively, use provider-specific key:
# GOOGLE_API_KEY=your_api_key_here
```

### Recommended Models

| Model | Free Tier | Paid | Best For |
|-------|-----------|------|----------|
| `gemini-1.5-flash` | 15 RPM | $0.00001875 / $0.000075 | Fast, cheap (recommended) |
| `gemini-1.5-pro` | 2 RPM | $0.00125 / $0.005 | Higher quality |
| `gemini-1.0-pro` | 60 RPM | Free | Budget option |

### Free Tier Limits

- **Flash:** 15 requests/minute (enough for most resume sites)
- **Pro:** 2 requests/minute
- **1.0 Pro:** 60 requests/minute

### Pros & Cons

**Pros:**
- ✅ Generous free tier
- ✅ Good quality
- ✅ Very affordable paid tier
- ✅ Large context (2M tokens)

**Cons:**
- ⚠️ Newer, less proven
- ⚠️ Rate limits on free tier
- ⚠️ Occasional inconsistency

## Azure OpenAI

Enterprise-grade OpenAI with Microsoft infrastructure.

### Setup

1. **Get Access:**
   - Requires Azure account
   - Apply for Azure OpenAI access
   - Create resource in Azure portal

2. **Configure:**

In `config.json`:
```json
{
  "ai": {
    "provider": "azure",
    "model": "gpt-4o-mini",
    "temperature": 0.7,
    "maxTokens": 1024
  }
}
```

In `backend/.env`:
```bash
AZURE_OPENAI_API_KEY=your_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT=your-deployment-name
AI_PROVIDER=azure
```

### Pros & Cons

**Pros:**
- ✅ Enterprise compliance (SOC 2, ISO 27001)
- ✅ Data residency options
- ✅ Integration with Azure services
- ✅ Microsoft support

**Cons:**
- ❌ Complex setup
- ❌ Requires Azure account
- ❌ More expensive
- ⚠️ Application process for access

**Best for:** Corporate/enterprise deployments

## Open Source (Ollama)

Run AI models locally on your own hardware.

### Setup

1. **Install Ollama:**
```bash
# Mac/Linux
curl -fsSL https://ollama.com/install.sh | sh

# Or download from ollama.com
```

2. **Pull Model:**
```bash
ollama pull llama3.1:8b
```

3. **Configure:**

In `config.json`:
```json
{
  "ai": {
    "provider": "ollama",
    "model": "llama3.1:8b",
    "temperature": 0.7,
    "maxTokens": 1024
  }
}
```

In `backend/.env`:
```bash
OLLAMA_BASE_URL=http://localhost:11434
AI_PROVIDER=ollama
AI_MODEL=llama3.1:8b
```

### Recommended Models

| Model | Size | RAM Needed | Quality |
|-------|------|------------|---------|
| `llama3.1:8b` | 4.7GB | 8GB | Good |
| `llama3.1:70b` | 40GB | 64GB | Excellent |
| `mistral:7b` | 4.1GB | 8GB | Good |

### Pros & Cons

**Pros:**
- ✅ Completely free
- ✅ Full privacy (runs locally)
- ✅ No API limits
- ✅ Works offline

**Cons:**
- ❌ Requires powerful hardware
- ❌ Slower responses
- ❌ Lower quality than cloud APIs
- ❌ Complex deployment

**Best for:** Privacy-focused, self-hosted setups

## Configuration Guide

### Switching Providers

To switch providers, update two files:

**1. config.json:**
```json
{
  "ai": {
    "provider": "openai",  // Change this
    "model": "gpt-4o-mini", // And this
    "temperature": 0.7,
    "maxTokens": 1024
  }
}
```

**2. backend/.env:**
```bash
# Comment out old provider
# GROQ_API_KEY=...

# Add new provider
OPENAI_API_KEY=sk-your_key_here
AI_PROVIDER=openai
AI_MODEL=gpt-4o-mini
```

### Temperature Settings

Controls response randomness:

- **0.3-0.5:** More focused, factual (job fit assessments)
- **0.7:** Balanced (recommended for chat)
- **0.9-1.0:** More creative (casual conversation)

```json
{
  "ai": {
    "temperature": 0.7
  }
}
```

### Max Tokens

Limits response length:

- **512:** Short answers
- **1024:** Standard (recommended)
- **2048:** Detailed explanations

```json
{
  "ai": {
    "maxTokens": 1024
  }
}
```

## Cost Optimization

### 1. Choose Right Model

- **Testing:** Use free tiers (Groq, Gemini Flash)
- **Production:** Start with cheaper models (gpt-4o-mini)
- **Upgrade:** Only if quality isn't sufficient

### 2. Implement Caching

Cache common questions:
```javascript
// Cache FAQ responses
const cache = new Map();
if (cache.has(question)) {
  return cache.get(question);
}
```

### 3. Set Rate Limits

Prevent abuse:
```javascript
// In backend
app.use(rateLimit({
  windowMs: 60000,     // 1 minute
  max: 10              // 10 requests per minute
}));
```

### 4. Optimize Prompts

Shorter prompts = lower costs:
- Remove unnecessary context
- Use concise system prompts
- Don't repeat information

### 5. Monitor Usage

Track costs:
- Set up billing alerts
- Monitor request counts
- Review usage weekly

### Expected Costs

**Low Traffic** (100 conversations/month):
- Groq: $0
- Gemini Flash: $0
- GPT-4o-mini: $0.50-1
- Claude Haiku: $0.30-0.80

**Medium Traffic** (1,000 conversations/month):
- Groq: $0
- Gemini Flash: $0
- GPT-4o-mini: $5-10
- Claude Haiku: $3-8

**High Traffic** (10,000 conversations/month):
- Groq: $0 (may hit limits)
- Gemini Flash: $5-15
- GPT-4o-mini: $50-100
- Claude Haiku: $30-80

## Switching Providers

### Migration Checklist

- [ ] Choose new provider
- [ ] Get API key
- [ ] Update `config.json`
- [ ] Update `backend/.env`
- [ ] Test locally
- [ ] Update deployment environment variables
- [ ] Deploy changes
- [ ] Monitor for errors
- [ ] Update documentation

### Testing New Provider

Before deploying:

```bash
# 1. Update local config
# 2. Start backend
cd backend && npm run dev

# 3. Test with curl
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me about your experience"}'

# 4. Verify response quality
# 5. Check response time
# 6. Test error handling
```

## Troubleshooting

### API Key Not Working

**Check:**
- Key is copied correctly (no extra spaces)
- Key is active (not revoked)
- Billing is set up (for paid providers)
- Correct environment variable name

### Rate Limit Errors

**Solutions:**
- Implement request queuing
- Add exponential backoff
- Upgrade to paid tier
- Switch to provider with higher limits

### Poor Response Quality

**Solutions:**
- Try different model (e.g., GPT-3.5 → GPT-4o-mini)
- Adjust temperature (lower = more focused)
- Improve system prompt
- Add more context about your background

### Slow Responses

**Solutions:**
- Use faster models (Groq, Gemini Flash)
- Reduce max_tokens
- Implement streaming responses
- Add loading indicators

## Recommendations

### For Different Scenarios

**Personal portfolio (low traffic):**
→ **Groq** (free, fast, good quality)

**Professional site (medium traffic):**
→ **Google Gemini Flash** (free tier covers most needs)

**Job search (quality matters):**
→ **OpenAI GPT-4o-mini** (best quality for cost)

**Enterprise/corporate:**
→ **Azure OpenAI** (compliance, support)

**Privacy-focused:**
→ **Ollama** (local, offline)

**Budget unlimited, quality critical:**
→ **OpenAI GPT-4o** or **Claude Sonnet**

---

**Default Recommendation:** Start with **Groq** (reference implementation), switch to **Gemini Flash** or **GPT-4o-mini** for production.
