"use client"

import { ContentLayout } from "@/components/admin-panel/content-layout"
import { VocabBattleUi } from "./_components/vocab-battle-ui"
import { useVocabBattleSocket } from "./_lib/socket"
import Link from "@/components/demo/link";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";


export default function VocabBattlePage() {
  const battle = useVocabBattleSocket()

  return (
    <ContentLayout title="Users">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Vocab Battle</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PlaceholderContent >
        <VocabBattleUi {...battle} />
      </PlaceholderContent>
    </ContentLayout >
  )
}
