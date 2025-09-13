import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Database, 
  Route, 
  Settings, 
  Activity,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SystemDocs = () => {
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // System audit data
  const auditReport = {
    projectInfo: {
      name: "HTW Host Copilot",
      type: "Vite + React + TypeScript",
      framework: "React Router v6",
      styling: "Tailwind CSS + shadcn/ui"
    },
    routes: [
      { path: "/", component: "HTWDashboard", status: "active", description: "Main dashboard with submitter/judge views" },
      { path: "/landing", component: "Landing", status: "active", description: "Marketing landing page" },
      { path: "/wizard", component: "Wizard", status: "active", description: "Event creation wizard (3 steps)" },
      { path: "/review", component: "Review", status: "active", description: "Event review queue for judges" },
      { path: "/docs/system", component: "SystemDocs", status: "active", description: "System documentation and audit" },
      { path: "*", component: "NotFound", status: "active", description: "404 fallback page" }
    ],
    database: {
      provider: "Supabase",
      tables: [
        { name: "events", status: "exists", description: "Event submissions with AI output" },
        { name: "hosts", status: "exists", description: "Host information and contacts" },
        { name: "reviews", status: "exists", description: "Review feedback and status" }
      ],
      newTables: [
        { name: "kb_chunks", status: "planned", description: "Knowledge base for Q&A" },
        { name: "prompt_templates", status: "planned", description: "Reusable AI prompt templates" },
        { name: "actions_log", status: "planned", description: "Audit trail for all actions" }
      ]
    },
    apiEndpoints: [
      { method: "POST", path: "/api/generate", status: "planned", description: "Generate AI event plan" },
      { method: "POST", path: "/api/submit", status: "planned", description: "Submit event for review" },
      { method: "POST", path: "/api/review/list", status: "planned", description: "List events for review (admin only)" },
      { method: "POST", path: "/api/review/approve", status: "planned", description: "Approve event submission" },
      { method: "POST", path: "/api/review/request_changes", status: "planned", description: "Request changes to event" },
      { method: "POST", path: "/api/ask", status: "planned", description: "Grounded Q&A system" },
      { method: "POST", path: "/api/review/summarize", status: "planned", description: "AI summary for reviewers" }
    ],
    envVariables: [
      { name: "SUPABASE_URL", status: "hardcoded", required: true, description: "Currently hardcoded in client.ts" },
      { name: "SUPABASE_ANON_KEY", status: "hardcoded", required: true, description: "Currently hardcoded in client.ts" },
      { name: "OPENAI_API_KEY", status: "missing", required: true, description: "Required for AI generation" },
      { name: "ADMIN_TOKEN", status: "missing", required: true, description: "Demo-grade admin protection" },
      { name: "TIMEZONE", status: "missing", required: false, description: "Pacific/Honolulu for timestamps" }
    ],
    features: [
      { name: "Event Creation Wizard", status: "complete", description: "3-step wizard with validation" },
      { name: "Dashboard Views", status: "complete", description: "Submitter and judge role switching" },
      { name: "Review Queue", status: "mock-data", description: "Static data, needs backend integration" },
      { name: "AI Event Generation", status: "planned", description: "OpenAI integration for event planning" },
      { name: "Grounded Q&A", status: "planned", description: "Knowledge base querying system" },
      { name: "Admin Authentication", status: "planned", description: "Token-based admin access" },
      { name: "Audit Logging", status: "planned", description: "Action tracking and compliance" },
      { name: "Data Seeding", status: "planned", description: "Demo data population" }
    ]
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      complete: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      exists: { variant: "secondary" as const, icon: CheckCircle, color: "text-green-600" },
      planned: { variant: "outline" as const, icon: AlertCircle, color: "text-yellow-600" },
      missing: { variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
      hardcoded: { variant: "secondary" as const, icon: AlertCircle, color: "text-yellow-600" },
      "mock-data": { variant: "outline" as const, icon: AlertCircle, color: "text-blue-600" }
    };
    
    const config = variants[status as keyof typeof variants] || variants.planned;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className={`h-3 w-3 ${config.color}`} />
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
    toast({
      title: "System Status Refreshed",
      description: "Latest information retrieved successfully."
    });
  };

  const handleSeedData = async () => {
    // This will call the seed API when implemented
    toast({
      title: "Seed Operation",
      description: "Demo data seeding functionality will be available after backend implementation.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            System Documentation & Audit
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            HTW Host Copilot - Backend Architecture & Status Report
          </p>
          <div className="flex justify-center gap-3">
            <Button onClick={handleRefresh} variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Status
            </Button>
            <Button onClick={handleSeedData} variant="outline" size="sm">
              <Database className="mr-2 h-4 w-4" />
              Seed Demo Data
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        </div>

        <div className="grid gap-8">
          {/* Project Overview */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Project Overview
              </CardTitle>
              <CardDescription>Current architecture and technology stack</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(auditReport.projectInfo).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                    <span className="text-sm text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Routes */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5" />
                Application Routes
              </CardTitle>
              <CardDescription>Current page routes and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditReport.routes.map((route, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{route.path}</div>
                      <div className="text-sm text-muted-foreground">{route.description}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{route.component}</span>
                      {getStatusBadge(route.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Database */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Schema
              </CardTitle>
              <CardDescription>Supabase tables and data model</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Existing Tables</h4>
                <div className="space-y-2">
                  {auditReport.database.tables.map((table, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{table.name}</div>
                        <div className="text-sm text-muted-foreground">{table.description}</div>
                      </div>
                      {getStatusBadge(table.status)}
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-3">Planned Tables</h4>
                <div className="space-y-2">
                  {auditReport.database.newTables.map((table, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-accent/30">
                      <div>
                        <div className="font-medium">{table.name}</div>
                        <div className="text-sm text-muted-foreground">{table.description}</div>
                      </div>
                      {getStatusBadge(table.status)}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Endpoints */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                API Surface
              </CardTitle>
              <CardDescription>Planned Supabase Edge Functions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditReport.apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{endpoint.method}</Badge>
                        <span className="font-medium">{endpoint.path}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{endpoint.description}</div>
                    </div>
                    {getStatusBadge(endpoint.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Environment Variables */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Environment Configuration
              </CardTitle>
              <CardDescription>Required configuration and secrets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditReport.envVariables.map((env, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{env.name}</div>
                      <div className="text-sm text-muted-foreground">{env.description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {env.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                      {getStatusBadge(env.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Feature Status */}
          <Card className="shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Feature Implementation Status
              </CardTitle>
              <CardDescription>Development progress and completion status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditReport.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-sm text-muted-foreground">{feature.description}</div>
                    </div>
                    {getStatusBadge(feature.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SystemDocs;