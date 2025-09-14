export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      actions_log: {
        Row: {
          action: string
          actor: string
          created_at: string
          event_id: string | null
          id: string
          payload: Json | null
        }
        Insert: {
          action: string
          actor: string
          created_at?: string
          event_id?: string | null
          id?: string
          payload?: Json | null
        }
        Update: {
          action?: string
          actor?: string
          created_at?: string
          event_id?: string | null
          id?: string
          payload?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "actions_log_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          target_id: string
          target_type: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          target_id: string
          target_type: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          target_id?: string
          target_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_status_history: {
        Row: {
          by_user_id: string | null
          created_at: string | null
          event_id: string | null
          from_status: string | null
          id: string
          note: string | null
          to_status: string
        }
        Insert: {
          by_user_id?: string | null
          created_at?: string | null
          event_id?: string | null
          from_status?: string | null
          id?: string
          note?: string | null
          to_status: string
        }
        Update: {
          by_user_id?: string | null
          created_at?: string | null
          event_id?: string | null
          from_status?: string | null
          id?: string
          note?: string | null
          to_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_status_history_by_user_id_fkey"
            columns: ["by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_status_history_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          ai_output: Json | null
          attachments: Json | null
          audience_types: Database["public"]["Enums"]["audience_type"][] | null
          capacity_target: number | null
          created_at: string | null
          description: string | null
          end_at: string | null
          event_types: Database["public"]["Enums"]["event_type"][] | null
          host_user_id: string | null
          id: string
          idea_text: string | null
          luma_url: string | null
          marketing_stage: string | null
          start_at: string | null
          status: string | null
          time_flexible: boolean | null
          title: string | null
          updated_at: string | null
          venue_id: string | null
        }
        Insert: {
          ai_output?: Json | null
          attachments?: Json | null
          audience_types?: Database["public"]["Enums"]["audience_type"][] | null
          capacity_target?: number | null
          created_at?: string | null
          description?: string | null
          end_at?: string | null
          event_types?: Database["public"]["Enums"]["event_type"][] | null
          host_user_id?: string | null
          id?: string
          idea_text?: string | null
          luma_url?: string | null
          marketing_stage?: string | null
          start_at?: string | null
          status?: string | null
          time_flexible?: boolean | null
          title?: string | null
          updated_at?: string | null
          venue_id?: string | null
        }
        Update: {
          ai_output?: Json | null
          attachments?: Json | null
          audience_types?: Database["public"]["Enums"]["audience_type"][] | null
          capacity_target?: number | null
          created_at?: string | null
          description?: string | null
          end_at?: string | null
          event_types?: Database["public"]["Enums"]["event_type"][] | null
          host_user_id?: string | null
          id?: string
          idea_text?: string | null
          luma_url?: string | null
          marketing_stage?: string | null
          start_at?: string | null
          status?: string | null
          time_flexible?: boolean | null
          title?: string | null
          updated_at?: string | null
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_events_host_user_id"
            columns: ["host_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_events_venue_id"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      hosts: {
        Row: {
          bio: string | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string | null
          id: string
          linkedin_url: string | null
          name: string | null
          org: string | null
          phone: string | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          linkedin_url?: string | null
          name?: string | null
          org?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          linkedin_url?: string | null
          name?: string | null
          org?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      kb_chunks: {
        Row: {
          content: string
          created_at: string
          heading: string
          id: string
          source: string
        }
        Insert: {
          content: string
          created_at?: string
          heading: string
          id?: string
          source: string
        }
        Update: {
          content?: string
          created_at?: string
          heading?: string
          id?: string
          source?: string
        }
        Relationships: []
      }
      message_threads: {
        Row: {
          context_id: string
          context_type: string
          created_at: string | null
          id: string
          participants: string[] | null
          updated_at: string | null
        }
        Insert: {
          context_id: string
          context_type: string
          created_at?: string | null
          id?: string
          participants?: string[] | null
          updated_at?: string | null
        }
        Update: {
          context_id?: string
          context_type?: string
          created_at?: string | null
          id?: string
          participants?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          sender_id: string | null
          thread_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          sender_id?: string | null
          thread_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          sender_id?: string | null
          thread_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "message_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      prompt_templates: {
        Row: {
          body: string
          created_at: string
          id: string
          key: string
          title: string
          variables: Json | null
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          key: string
          title: string
          variables?: Json | null
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          key?: string
          title?: string
          variables?: Json | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comments: string | null
          created_at: string | null
          event_id: string | null
          id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      submission_windows: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          late_policy: string | null
          start_date: string
          year: number
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          late_policy?: string | null
          start_date: string
          year: number
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          late_policy?: string | null
          start_date?: string
          year?: number
        }
        Relationships: []
      }
      templates: {
        Row: {
          content: string
          created_at: string | null
          id: string
          tags: string[] | null
          type: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          tags?: string[] | null
          type: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          tags?: string[] | null
          type?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          org: string | null
          phone: string | null
          roles: Database["public"]["Enums"]["user_role"][] | null
          updated_at: string | null
          verified_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          org?: string | null
          phone?: string | null
          roles?: Database["public"]["Enums"]["user_role"][] | null
          updated_at?: string | null
          verified_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          org?: string | null
          phone?: string | null
          roles?: Database["public"]["Enums"]["user_role"][] | null
          updated_at?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      venue_availability_rules: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          rrule: string
          timezone: string | null
          venue_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          rrule: string
          timezone?: string | null
          venue_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          rrule?: string
          timezone?: string | null
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "venue_availability_rules_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      venue_blackouts: {
        Row: {
          created_at: string | null
          end_at: string
          id: string
          reason: string | null
          start_at: string
          venue_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_at: string
          id?: string
          reason?: string | null
          start_at: string
          venue_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_at?: string
          id?: string
          reason?: string | null
          start_at?: string
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "venue_blackouts_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      venues: {
        Row: {
          address: string
          amenities: string[] | null
          capacity: number | null
          claimed_by_user_id: string | null
          contact_email: string | null
          created_at: string | null
          id: string
          listing_visibility: boolean | null
          name: string
          neighborhood: string | null
          photos: string[] | null
          status: Database["public"]["Enums"]["venue_status"] | null
          updated_at: string | null
        }
        Insert: {
          address: string
          amenities?: string[] | null
          capacity?: number | null
          claimed_by_user_id?: string | null
          contact_email?: string | null
          created_at?: string | null
          id?: string
          listing_visibility?: boolean | null
          name: string
          neighborhood?: string | null
          photos?: string[] | null
          status?: Database["public"]["Enums"]["venue_status"] | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          amenities?: string[] | null
          capacity?: number | null
          claimed_by_user_id?: string | null
          contact_email?: string | null
          created_at?: string | null
          id?: string
          listing_visibility?: boolean | null
          name?: string
          neighborhood?: string | null
          photos?: string[] | null
          status?: Database["public"]["Enums"]["venue_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "venues_claimed_by_user_id_fkey"
            columns: ["claimed_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      audience_type:
        | "founders"
        | "investors"
        | "students"
        | "developers"
        | "designers"
        | "marketers"
        | "general"
      event_status:
        | "draft"
        | "submitted"
        | "in_review"
        | "changes_requested"
        | "resubmitted"
        | "approved"
        | "scheduled"
        | "published"
        | "completed"
        | "archived"
        | "declined"
      event_type:
        | "panel"
        | "mixer"
        | "masterclass"
        | "launch"
        | "workshop"
        | "networking"
        | "keynote"
      user_role: "event_host" | "htw_staff" | "venue_host"
      venue_status:
        | "pending_verification"
        | "approved"
        | "rejected"
        | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      audience_type: [
        "founders",
        "investors",
        "students",
        "developers",
        "designers",
        "marketers",
        "general",
      ],
      event_status: [
        "draft",
        "submitted",
        "in_review",
        "changes_requested",
        "resubmitted",
        "approved",
        "scheduled",
        "published",
        "completed",
        "archived",
        "declined",
      ],
      event_type: [
        "panel",
        "mixer",
        "masterclass",
        "launch",
        "workshop",
        "networking",
        "keynote",
      ],
      user_role: ["event_host", "htw_staff", "venue_host"],
      venue_status: [
        "pending_verification",
        "approved",
        "rejected",
        "suspended",
      ],
    },
  },
} as const
