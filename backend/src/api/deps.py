from src.llm.factory import PROVIDERS

def get_llm_provider(provider_type: str, model: str):
    provider_cls = PROVIDERS.get(provider_type)
    
    if provider_cls is None:
        raise ValueError(f"Unknown provider: {provider_type}")
    
    return provider_cls(model=model)