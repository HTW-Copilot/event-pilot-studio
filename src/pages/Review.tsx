import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Clock, Calendar, Users, DollarSign, MapPin } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  budget: string;
  attendees: string;
  status: "pending" | "approved" | "changes_requested";
  submittedBy: string;
  submittedAt: string;
}

const Review = () => {
  const { toast } = useToast();
  
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "HTW Tech Conference 2024",
      description: "Annual technology conference featuring industry leaders and cutting-edge innovations.",
      venue: "HTW Main Auditorium",
      date: "2024-06-15",
      budget: "$15,000 - $20,000",
      attendees: "200-300 people",
      status: "pending",
      submittedBy: "Sarah Johnson",
      submittedAt: "2024-01-15"
    },
    {
      id: "2",
      title: "Student Networking Night",
      description: "Casual networking event for students to connect with industry professionals.",
      venue: "HTW Student Center",
      date: "2024-03-22",
      budget: "$2,000 - $3,000",
      attendees: "50-75 people",
      status: "approved",
      submittedBy: "Mike Chen",
      submittedAt: "2024-01-10"
    },
    {
      id: "3",
      title: "Research Symposium",
      description: "Showcase of ongoing research projects and academic achievements.",
      venue: "TBD",
      date: "2024-05-10",
      budget: "$5,000 - $8,000",
      attendees: "100-150 people",
      status: "changes_requested",
      submittedBy: "Dr. Alex Rivera",
      submittedAt: "2024-01-12"
    }
  ]);

  const handleApprove = (eventId: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId ? { ...event, status: "approved" as const } : event
      )
    );
    toast({
      title: "Event Approved",
      description: "The event has been approved and will proceed to planning.",
    });
  };

  const handleRequestChanges = (eventId: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId ? { ...event, status: "changes_requested" as const } : event
      )
    );
    toast({
      title: "Changes Requested",
      description: "The submitter will be notified to make revisions.",
      variant: "destructive"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20"><Clock className="mr-1 h-3 w-3" />Pending</Badge>;
      case "approved":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20"><CheckCircle className="mr-1 h-3 w-3" />Approved</Badge>;
      case "changes_requested":
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20"><XCircle className="mr-1 h-3 w-3" />Changes Requested</Badge>;
      default:
        return null;
    }
  };

  const pendingEvents = events.filter(event => event.status === "pending");
  const reviewedEvents = events.filter(event => event.status !== "pending");

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Event Review Queue
            </h1>
            <p className="text-muted-foreground text-lg">
              Review and approve event submissions from your team
            </p>
          </div>

          {/* Pending Events */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Clock className="h-6 w-6 text-warning" />
              Pending Approval ({pendingEvents.length})
            </h2>
            
            {pendingEvents.length === 0 ? (
              <Card className="shadow-card border-0">
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No events pending approval</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {pendingEvents.map((event) => (
                  <Card key={event.id} className="shadow-card border-0">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                          <CardDescription className="text-base">
                            {event.description}
                          </CardDescription>
                        </div>
                        {getStatusBadge(event.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Submitted by {event.submittedBy} on {new Date(event.submittedAt).toLocaleDateString()}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="text-sm">{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span className="text-sm">{event.budget}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="text-sm">{event.attendees}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => handleApprove(event.id)}
                          className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve Event
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => handleRequestChanges(event.id)}
                          className="flex-1 border-destructive/20 text-destructive hover:bg-destructive/10"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Request Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Reviewed Events */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-success" />
              Recently Reviewed ({reviewedEvents.length})
            </h2>
            
            <div className="space-y-4">
              {reviewedEvents.map((event) => (
                <Card key={event.id} className="shadow-card border-0">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{event.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>by {event.submittedBy}</span>
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                          <span>{event.venue}</span>
                        </div>
                      </div>
                      {getStatusBadge(event.status)}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;