import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Star } from "lucide-react"

const topWorkers = [
  { id: 1, name: "Alice Smith", trade: "Electrician", rating: 4.9, jobs: 120, earnings: 15000 },
  { id: 2, name: "Bob Johnson", trade: "Carpenter", rating: 4.8, jobs: 110, earnings: 13500 },
  { id: 3, name: "Charlie Davis", trade: "Painter", rating: 4.7, jobs: 105, earnings: 12800 },
  { id: 4, name: "David Lee", trade: "Plumber", rating: 4.6, jobs: 95, earnings: 11500 },
  { id: 5, name: "Eva Martinez", trade: "Tiler", rating: 4.5, jobs: 90, earnings: 11000 },
]

export default function WorkersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Workers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Trade</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Jobs Completed</TableHead>
              <TableHead>Earnings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topWorkers.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell className="font-medium">{worker.name}</TableCell>
                <TableCell>{worker.trade}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{worker.rating}</span>
                  </div>
                </TableCell>
                <TableCell>{worker.jobs}</TableCell>
                <TableCell>${worker.earnings.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}