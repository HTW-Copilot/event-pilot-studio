import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  MessageSquare,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  description: string;
  host: string;
  status: 'draft' | 'submitted' | 'in_review' | 'changes_requested' | 'approved' | 'scheduled' | 'published';
  event_types: string[];
  audience_types: string[];
  venue?: string;
  start_at?: string;
  capacity_target?: number;
  created_at: string;
}

interface Venue {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  capacity: number;
  status: 'pending_verification' | 'approved' | 'rejected' | 'suspended';
  claimed_by?: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('events');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [reviewComment, setReviewComment] = useState('');

  // Mock data
  const events: Event[] = [
    {
      id: '1',
      title: 'AI in Healthcare: Panel Discussion',
      description: 'Exploring the latest trends in AI applications for healthcare in Hawaii.',
      host: 'Dr. Sarah Kim',
      status: 'submitted',
      event_types: ['panel'],
      audience_types: ['founders', 'investors'],
      venue: 'The Sandbox',
      start_at: '2025-04-15T14:00:00Z',
      capacity_target: 100,
      created_at: '2025-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'Startup Mixer: Ocean Tech',
      description: 'Networking event for ocean technology startups and investors.',
      host: 'Pacific Tech Ventures',
      status: 'in_review',
      event_types: ['mixer', 'networking'],
      audience_types: ['founders', 'investors'],
      capacity_target: 75,
      created_at: '2025-01-20T15:30:00Z'
    }
  ];

  const venues: Venue[] = [
    {
      id: '1',
      name: 'Tech Hub Kakaako',
      address: '123 Innovation Way, Honolulu, HI',
      neighborhood: 'Kakaako',
      capacity: 200,
      status: 'pending_verification',
      claimed_by: 'john@techhub.com',
      created_at: '2025-01-10T12:00:00Z'
    },
    {
      id: '2',
      name: 'The Sandbox',
      address: '685 Auahi St, Honolulu, HI 96813',
      neighborhood: 'Kakaako',
      capacity: 150,
      status: 'approved',
      created_at: '2025-01-05T09:00:00Z'
    }
  ];

  const handleEventAction = (eventId: string, action: 'approve' | 'request_changes' | 'decline') => {
    const actionMessages = {
      approve: 'Event approved successfully!',
      request_changes: 'Change request sent to host',
      decline: 'Event declined'
    };

    toast({
      title: "Action Complete",
      description: actionMessages[action],
      variant: action === 'decline' ? 'destructive' : 'default'
    });

    setSelectedEvent(null);
    setReviewComment('');
  };

  const handleVenueAction = (venueId: string, action: 'approve' | 'reject' | 'suspend') => {
    const actionMessages = {
      approve: 'Venue approved and listed',
      reject: 'Venue application rejected',
      suspend: 'Venue suspended from listings'
    };

    toast({
      title: "Venue Updated",
      description: actionMessages[action],
      variant: action === 'reject' || action === 'suspend' ? 'destructive' : 'default'
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      draft: 'secondary',
      submitted: 'outline',
      in_review: 'default',
      changes_requested: 'destructive',
      approved: 'default',
      scheduled: 'secondary',
      published: 'default'
    };
    
    return <Badge variant={variants[status] || 'secondary'}>{status.replace('_', ' ')}</Badge>;
  };

  const getVenueStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending_verification: 'outline',
      approved: 'default',
      rejected: 'destructive',
      suspended: 'secondary'
    };
    
    return <Badge variant={variants[status] || 'secondary'}>{status.replace('_', ' ')}</Badge>;
  };

  const filteredEvents = statusFilter === 'all' 
    ? events 
    : events.filter(event => event.status === statusFilter);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">HTW Staff Dashboard</h1>
          <p className="text-muted-foreground">Manage events, venues, and approvals</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Venues</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+3 new venues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="events">Event Review</TabsTrigger>
          <TabsTrigger value="venues">Venue Management</TabsTrigger>
          <TabsTrigger value="timeline">Event Timeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="changes_requested">Changes Requested</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription>
                        By {event.host} • {event.event_types.join(', ')} • Target: {event.capacity_target} attendees
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(event.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>📍 {event.venue || 'Venue TBD'}</span>
                      <span>👥 {event.audience_types.join(', ')}</span>
                      {event.start_at && (
                        <span>📅 {new Date(event.start_at).toLocaleDateString()}</span>
                      )}
                    </div>
                    
                    {(event.status === 'submitted' || event.status === 'in_review') && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Review
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Review Modal */}
          {selectedEvent && (
            <Card className="fixed inset-4 z-50 max-w-2xl mx-auto bg-background border shadow-lg">
              <CardHeader>
                <CardTitle>Review: {selectedEvent.title}</CardTitle>
                <CardDescription>Provide feedback and make a decision</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Comments & Feedback</label>
                  <Textarea
                    placeholder="Provide detailed feedback for the host..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <Button 
                    onClick={() => handleEventAction(selectedEvent.id, 'approve')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleEventAction(selectedEvent.id, 'request_changes')}
                  >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Request Changes
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleEventAction(selectedEvent.id, 'decline')}
                  >
                    Decline
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => setSelectedEvent(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="venues" className="space-y-4">
          <div className="grid gap-4">
            {venues.map((venue) => (
              <Card key={venue.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{venue.name}</CardTitle>
                      <CardDescription>
                        {venue.address} • {venue.neighborhood} • Capacity: {venue.capacity}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getVenueStatusBadge(venue.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {venue.claimed_by ? `Claimed by: ${venue.claimed_by}` : 'Unclaimed'}
                    </div>
                    
                    <div className="flex gap-2">
                      {venue.status === 'pending_verification' && (
                        <>
                          <Button 
                            size="sm"
                            onClick={() => handleVenueAction(venue.id, 'approve')}
                          >
                            Approve
                          </Button>
                          <Button 
                            variant="destructive"
                            size="sm"
                            onClick={() => handleVenueAction(venue.id, 'reject')}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {venue.status === 'approved' && (
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleVenueAction(venue.id, 'suspend')}
                        >
                          Suspend
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Event Timeline View</CardTitle>
              <CardDescription>Visual calendar of all scheduled events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Calendar view coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Event Analytics</CardTitle>
              <CardDescription>Insights and metrics for HTW 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Analytics dashboard coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;