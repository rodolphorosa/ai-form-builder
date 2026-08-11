import Image from "next/image";
import { Builder } from "../../features/builder";
import { Explorer } from "@/features/workspace/explorer";
import { Workspace } from "@/features/workspace/home";
import { Login } from "@/features/workspace/login";

export default function Home() {
  return (
    <Workspace />
  );
}
