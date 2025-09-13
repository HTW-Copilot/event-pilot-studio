import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Clock, MessageSquare, Calendar, Users, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OrganizerDashboard = () => {
  const { toast } = useToast();
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const submissions = [
    {
      id: '1',
      title: 'AI & Machine Learning Workshop',
      host: 'Sarah Chen',
      org: 'TechCorp Hawaii',
      status: 'pending',
      submittedAt: '2025-01-10',
      description: 'A comprehensive workshop covering the latest in AI and ML technologies...',
      venue: 'Coworking Hi-Tech',
      expectedAttendees: 50,
      budget: '$2,000'
    },
    {
      id: '2', 
      title: 'Blockchain Innovation Panel',
      host: 'Mike Rodriguez',
      org: 'Crypto Ventures',
      status: 'approved',
      submittedAt: '2025-01-08',
      description: 'Panel discussion with industry leaders on blockchain innovation...',
      venue: 'UH Innovation Center',
      expectedAttendees: 75,
      budget: '$1,500'
    },
    {
      id: '3',
      title: 'Startup Pitch Night',
      host: 'Lisa Park',
      org: 'Founders Club',
      status: 'needs_revision',
      submittedAt: '2025-01-12',
      description: 'Local startups pitch their ideas to investors and community...',
      venue: 'Pearl Harbor Memorial Center',
      expectedAttendees: 100,
      budget: '$3,000'
    }
  ];

  const handleStatusChange = (submissionId: string, newStatus: string, feedback?: string) => {
    toast({
      title: "Status Updated",
      description: `Submission ${newStatus} successfully. Host will be notified.`,
    });
    setSelectedSubmission(null);
    setFeedbackText('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'needs_revision':
        return <Badge variant="destructive">Needs Revision</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow mb-2">HTW Organizer Dashboard</h1>
          <p className="text-white/80">Review and manage event submissions for HTW 2025</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-secondary/95 border-white/10">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-yellow mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-white/60 text-sm">Pending Review</div>
            </CardContent>
          </Card>
          <Card className="bg-secondary/95 border-white/10">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">28</div>
              <div className="text-white/60 text-sm">Approved</div>
            </CardContent>
          </Card>
          <Card className="bg-secondary/95 border-white/10">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">2,150</div>
              <div className="text-white/60 text-sm">Expected Attendees</div>
            </CardContent>
          </Card>
          <Card className="bg-secondary/95 border-white/10">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-teal-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">85%</div>
              <div className="text-white/60 text-sm">Approval Rate</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="submissions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 border-white/20">
            <TabsTrigger value="submissions" className="text-white data-[state=active]:bg-yellow data-[state=active]:text-secondary">
              Submissions
            </TabsTrigger>
            <TabsTrigger value="calendar" className="text-white data-[state=active]:bg-yellow data-[state=active]:text-secondary">
              Calendar Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-yellow data-[state=active]:text-secondary">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submissions">
            <div className="grid gap-6">
              {submissions.map((submission) => (
                <Card key={submission.id} className="bg-secondary/95 border-white/10">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-white">{submission.title}</CardTitle>
                        <div className="flex items-center gap-4 text-white/60 text-sm mt-2">
                          <span>Host: {submission.host}</span>
                          <span>Org: {submission.org}</span>
                          <span>Submitted: {submission.submittedAt}</span>
                        </div>
                      </div>
                      {getStatusBadge(submission.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 mb-4">{submission.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-white/60">Venue:</span>
                        <div className="text-white">{submission.venue}</div>
                      </div>
                      <div>
                        <span className="text-white/60">Expected Attendees:</span>
                        <div className="text-white">{submission.expectedAttendees}</div>
                      </div>
                      <div>
                        <span className="text-white/60">Budget:</span>
                        <div className="text-white">{submission.budget}</div>
                      </div>
                    </div>

                    {selectedSubmission === submission.id ? (
                      <div className="space-y-4 mt-4 p-4 bg-white/5 rounded-lg">
                        <Textarea
                          placeholder="Add feedback or revision notes..."
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleStatusChange(submission.id, 'approved', feedbackText)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleStatusChange(submission.id, 'needs_revision', feedbackText)}
                            variant="destructive"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Request Changes
                          </Button>
                          <Button
                            onClick={() => setSelectedSubmission(null)}
                            variant="ghost"
                            className="text-white/60"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2 mt-4">
                        <Button
                          onClick={() => setSelectedSubmission(submission.id)}
                          variant="outline"
                          size="sm"
                          className="bg-white/10 border-white/20 text-white hover:bg-yellow hover:text-secondary"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        {submission.status === 'approved' && (
                          <Button size="sm" className="bg-yellow text-secondary hover:bg-yellow/90">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="bg-secondary/95 border-white/10">
              <CardHeader>
                <CardTitle className="text-yellow">Calendar Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-white/80">
                  Calendar integration and scheduling tools will be implemented here.
                  This will show approved events on the HTW timeline with conflict detection.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-secondary/95 border-white/10">
              <CardHeader>
                <CardTitle className="text-yellow">Analytics & Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-white/80">
                  Analytics dashboard showing submission trends, popular venues, 
                  host demographics, and event performance metrics.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrganizerDashboard;