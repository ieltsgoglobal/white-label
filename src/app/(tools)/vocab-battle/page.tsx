"use client"

import { ContentLayout } from "@/components/admin-panel/content-layout"
import { VocabBattleUi } from "./_components/vocab-battle-ui"
import { useVocabBattleSocket } from "./_lib/socket"
import Link from "@/components/demo/link";
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
      <div className="mt-4 w-full sm:mt-6">
        <VocabBattleUi {...battle} />
      </div>
    </ContentLayout >
  )
}
