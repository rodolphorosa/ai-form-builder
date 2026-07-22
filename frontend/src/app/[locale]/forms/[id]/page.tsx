import { Builder } from "@/features/builder";
import { mockSchemas } from "@/features/mock";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const schema = mockSchemas[parseInt(id)];

  return <Builder schema={schema} />;
}