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
    PostgrestVersion: "17.1"
  }
  public: {
    Tables: {
      alert_rules: {
        Row: {
          enabled: boolean
          event_type: string
          id: string
          integration_id: string
          saas_id: string | null
        }
        Insert: {
          enabled?: boolean
          event_type: string
          id?: string
          integration_id: string
          saas_id?: string | null
        }
        Update: {
          enabled?: boolean
          event_type?: string
          id?: string
          integration_id?: string
          saas_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alert_rules_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alert_rules_saas_id_fkey"
            columns: ["saas_id"]
            isOneToOne: false
            referencedRelation: "saas"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          details: Json
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      clicks: {
        Row: {
          country: string | null
          created_at: string
          id: string
          ip_hash: string | null
          link_id: string
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          id?: string
          ip_hash?: string | null
          link_id: string
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          id?: string
          ip_hash?: string | null
          link_id?: string
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clicks_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "tracking_links"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          event_type: Database["public"]["Enums"]["event_type"]
          external_user_id: string
          id: string
          link_id: string | null
          metadata: Json
          ref_code: string | null
          saas_id: string
          step: string
        }
        Insert: {
          created_at?: string
          event_type: Database["public"]["Enums"]["event_type"]
          external_user_id: string
          id?: string
          link_id?: string | null
          metadata?: Json
          ref_code?: string | null
          saas_id: string
          step?: string
        }
        Update: {
          created_at?: string
          event_type?: Database["public"]["Enums"]["event_type"]
          external_user_id?: string
          id?: string
          link_id?: string | null
          metadata?: Json
          ref_code?: string | null
          saas_id?: string
          step?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "tracking_links"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_saas_id_fkey"
            columns: ["saas_id"]
            isOneToOne: false
            referencedRelation: "saas"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          config_encrypted: string | null
          created_at: string
          id: string
          status: string
          type: string
        }
        Insert: {
          config_encrypted?: string | null
          created_at?: string
          id?: string
          status?: string
          type: string
        }
        Update: {
          config_encrypted?: string | null
          created_at?: string
          id?: string
          status?: string
          type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      saas: {
        Row: {
          api_key_hash: string | null
          api_key_prefix: string | null
          created_at: string
          id: string
          last_event_at: string | null
          logo_url: string | null
          name: string
          url: string
          webhook_secret_encrypted: string | null
        }
        Insert: {
          api_key_hash?: string | null
          api_key_prefix?: string | null
          created_at?: string
          id?: string
          last_event_at?: string | null
          logo_url?: string | null
          name: string
          url: string
          webhook_secret_encrypted?: string | null
        }
        Update: {
          api_key_hash?: string | null
          api_key_prefix?: string | null
          created_at?: string
          id?: string
          last_event_at?: string | null
          logo_url?: string | null
          name?: string
          url?: string
          webhook_secret_encrypted?: string | null
        }
        Relationships: []
      }
      tracking_links: {
        Row: {
          campaign: string | null
          channel: Database["public"]["Enums"]["link_channel"]
          code: string
          created_at: string
          id: string
          name: string
          saas_id: string
        }
        Insert: {
          campaign?: string | null
          channel?: Database["public"]["Enums"]["link_channel"]
          code: string
          created_at?: string
          id?: string
          name: string
          saas_id: string
        }
        Update: {
          campaign?: string | null
          channel?: Database["public"]["Enums"]["link_channel"]
          code?: string
          created_at?: string
          id?: string
          name?: string
          saas_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tracking_links_saas_id_fkey"
            columns: ["saas_id"]
            isOneToOne: false
            referencedRelation: "saas"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      event_type:
        | "signup"
        | "onboarding_step"
        | "subscription_activated"
        | "subscription_cancelled"
      link_channel:
        | "facebook"
        | "whatsapp"
        | "telegram"
        | "tiktok"
        | "instagram"
        | "youtube"
        | "other"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "user"],
      event_type: [
        "signup",
        "onboarding_step",
        "subscription_activated",
        "subscription_cancelled",
      ],
      link_channel: [
        "facebook",
        "whatsapp",
        "telegram",
        "tiktok",
        "instagram",
        "youtube",
        "other",
      ],
    },
  },
} as const
