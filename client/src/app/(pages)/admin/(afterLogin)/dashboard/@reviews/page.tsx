import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const recentReviews = [
  { id: 1, user: "John Doe", worker: "Alice Smith", rating: 4.5, comment: "Great work, very professional!" },
  { id: 2, user: "Jane Smith", worker: "Bob Johnson", rating: 5, comment: "Excellent service, highly recommended!" },
  { id: 3, user: "Mike Brown", worker: "Charlie Davis", rating: 4, comment: "Good job, but could improve timeliness." },
  { id: 4, user: "Emily Wilson", worker: "David Lee", rating: 4.8, comment: "Very satisfied with the work done." },
  { id: 5, user: "Sarah Johnson", worker: "Eva Martinez", rating: 3.5, comment: "Decent work, but took longer than expected." },
]

export default function ReviewsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentReviews.map((review) => (
            <div key={review.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>{review.user[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{review.user}</p>
                <p className="text-sm text-muted-foreground">Worker: {review.worker}</p>
                <p className="text-sm">{review.comment}</p>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{review.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}