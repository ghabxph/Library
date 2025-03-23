# Extending LLM Memory - Leveraging External Libraries to Overcome Context Limitations

The creation of DeepSeek has enabled individuals to host their own large language models (LLMs) on local machines. However, the performance of an LLM is constrained by the hardware specifications of its host device. For instance, an LLM running on a typical MacBook Pro is often limited to a 4096-token context window—significantly smaller than the context sizes available in cloud-hosted models from major providers like OpenAI. This limitation presents a challenge: how can we enable LLMs to retain and recall information effectively without exceeding their context size constraints?

Human memory is inherently limited, which led to the invention of writing as a means to store and retrieve knowledge. Over time, institutions such as libraries were established to systematically preserve and provide access to vast collections of information. Similarly, we can integrate a “Library” system into LLM workflows to address the issue of limited context. A specialized reader agent can search this library, retrieving relevant information to supplement the model’s responses, thereby extending its effective memory without exceeding its built-in limitations.

# Prisma migration guide

https://www.prisma.io/docs/getting-started/quickstart-sqlite

```
npx prisma migrate dev --name init
```