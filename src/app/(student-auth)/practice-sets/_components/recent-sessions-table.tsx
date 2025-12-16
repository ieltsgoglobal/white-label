"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Session = Record<string, any>

export function RecentSessionsTable({ sessions = [] }: { sessions?: Session[] }) {

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="text-pretty">Recent Practice Sessions</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">

        {sessions.length > 0 ?
          <SessionsTable sessions={sessions} />
          :
          <EmptyRecentSessionsState />
        }

      </CardContent>
    </Card>
  )
}


function SessionsTable({ sessions }: { sessions: Session[] }) {
  const columns = Object.keys(sessions[0] || {})

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col, idx) => (
            <TableHead key={idx}>{col}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col, colIndex) => {
              const value = row[col]

              // if (col === "review link") {
              //   return (
              //     <TableCell key={colIndex}>
              //       <a
              //         href={value}
              //         className="text-primary underline underline-offset-4"
              //       >
              //         Review
              //       </a>
              //     </TableCell>
              //   )
              // }

              if (col === "duration min") {
                return <TableCell key={colIndex}>{value}m</TableCell>
              }

              return <TableCell key={colIndex}>{value}</TableCell>
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function EmptyRecentSessionsState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
      <p className="text-sm font-medium text-muted-foreground">
        No practice sessions yet
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Start your first IELTS practice test to see it listed here.
      </p>
    </div>
  )
}