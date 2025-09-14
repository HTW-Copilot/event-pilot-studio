import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, Calendar, BarChart3, Plus, CheckCircle, Clock, AlertCircle, Eye, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import honoluluSkylineSunset from "@/assets/honolulu-skyline-sunset.png";

interface Event {
  id: string;
  title: string;
  description: string;
  status: string;
  event_types: string[];
  audience_types: string[];
  capacity_target: number;
  start_at?: string;
  end_at?: string;
  created_at: string;
  updated_at: string;
}

const EventHostDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserEvents();
    }
  }, [user]);

  const fetchUserEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('host_user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to load your events",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "submitted":
      case "in_review":
        return <Clock className="h-4 w-4 text-warning" />;
      case "changes_requested":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "draft":
        return <Edit className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
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

  const getStats = () => {
    const totalEvents = events.length;
    const approvedEvents = events.filter(e => e.status === 'approved').length;
    const pendingEvents = events.filter(e => ['submitted', 'in_review'].includes(e.status)).length;
    const draftEvents = events.filter(e => e.status === 'draft').length;

    return { totalEvents, approvedEvents, pendingEvents, draftEvents };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/30 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 animate-slide-in-right" 
             style={{
               backgroundImage: `url(${honoluluSkylineSunset})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               animation: 'slide-left-to-right 20s linear infinite',
               width: '120%',
               height: '100%'
             }}>
        </div>
        <div className="absolute inset-0 bg-background/40 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8">
                  <Sparkles className="w-4 h-4" />
                  Welcome back, {user?.name} • HTW 2025
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Your Event
                  <br />
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Dashboard
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Manage your HTW 2025 events, track approval status, and get ready to showcase Hawaii's tech innovation.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/wizard">
                    <Button size="lg" className="px-8 py-4 text-lg shadow-elegant hover:shadow-glow transition-all duration-300">
                      <Plus className="mr-2 h-5 w-5" />
                      Create New Event
                    </Button>
                  </Link>
                  <Link to="/review">
                    <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                      <Eye className="mr-2 h-5 w-5" />
                      View All Events
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="shadow-elegant border-0 bg-white">
                <CardContent className="p-8 text-center">
                  <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stats.totalEvents}</div>
                  <div className="text-muted-foreground">Total Events</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-elegant border-0 bg-white">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stats.approvedEvents}</div>
                  <div className="text-muted-foreground">Approved</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-elegant border-0 bg-white">
                <CardContent className="p-8 text-center">
                  <Clock className="h-12 w-12 text-warning mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stats.pendingEvents}</div>
                  <div className="text-muted-foreground">Under Review</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-elegant border-0 bg-white">
                <CardContent className="p-8 text-center">
                  <Edit className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stats.draftEvents}</div>
                  <div className="text-muted-foreground">Drafts</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Your Events Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Your Events</h2>
                <p className="text-muted-foreground">Track your HTW 2025 submissions and approvals</p>
              </div>
              <Link to="/wizard">
                <Button className="shadow-elegant">
                  <Plus className="mr-2 h-4 w-4" />
                  New Event
                </Button>
              </Link>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading your events...</p>
              </div>
            ) : events.length === 0 ? (
              <Card className="shadow-elegant border-0 bg-white">
                <CardContent className="p-12 text-center">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No events yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Ready to create your first HTW 2025 event? Our wizard will guide you through the process.
                  </p>
                  <Link to="/wizard">
                    <Button size="lg">
                      <Plus className="mr-2 h-5 w-5" />
                      Create Your First Event
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="shadow-elegant border-0 bg-white hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusIcon(event.status)}
                            <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                            {getStatusBadge(event.status)}
                          </div>
                          <p className="text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
                          <div className="flex items-center gap-6 text-muted-foreground text-sm">
                            {event.start_at && (
                              <span>📅 {new Date(event.start_at).toLocaleDateString()}</span>
                            )}
                            {event.capacity_target && (
                              <span>👥 {event.capacity_target} attendees</span>
                            )}
                            {event.event_types.length > 0 && (
                              <span>🎯 {event.event_types.join(', ')}</span>
                            )}
                            <span>📝 {new Date(event.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/wizard?eventId=${event.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventHostDashboard;