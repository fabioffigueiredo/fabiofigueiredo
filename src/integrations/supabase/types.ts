export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          created_at: string
          id: string
          people_supported: number
          personal_story: string
          professional_goal: string
          satisfaction_rate: number
          section_title: string
          support_experience: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          people_supported?: number
          personal_story: string
          professional_goal: string
          satisfaction_rate?: number
          section_title?: string
          support_experience: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          people_supported?: number
          personal_story?: string
          professional_goal?: string
          satisfaction_rate?: number
          section_title?: string
          support_experience?: string
          updated_at?: string
        }
        Relationships: []
      }
      education: {
        Row: {
          achievements: string[] | null
          created_at: string
          degree: string
          description: string | null
          display_order: number
          field: string
          id: string
          institution: string
          is_active: boolean
          period: string
          status: string
          updated_at: string
        }
        Insert: {
          achievements?: string[] | null
          created_at?: string
          degree: string
          description?: string | null
          display_order?: number
          field: string
          id?: string
          institution: string
          is_active?: boolean
          period: string
          status?: string
          updated_at?: string
        }
        Update: {
          achievements?: string[] | null
          created_at?: string
          degree?: string
          description?: string | null
          display_order?: number
          field?: string
          id?: string
          institution?: string
          is_active?: boolean
          period?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          achievements: string[]
          company: string
          created_at: string
          description: string
          display_order: number
          id: string
          is_active: boolean
          location: string
          period: string
          technologies: string[]
          title: string
          updated_at: string
        }
        Insert: {
          achievements?: string[]
          company: string
          created_at?: string
          description: string
          display_order?: number
          id?: string
          is_active?: boolean
          location: string
          period: string
          technologies?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          achievements?: string[]
          company?: string
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          is_active?: boolean
          location?: string
          period?: string
          technologies?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      hero_content: {
        Row: {
          created_at: string
          description: string
          experience_years: number
          focus: string
          id: string
          name: string
          profile_image_url: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          experience_years?: number
          focus?: string
          id?: string
          name?: string
          profile_image_url?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          experience_years?: number
          focus?: string
          id?: string
          name?: string
          profile_image_url?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string
          display_order: number
          forks: number | null
          github_url: string
          id: string
          is_active: boolean
          live_url: string | null
          name: string
          stars: number | null
          technologies: string[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number
          forks?: number | null
          github_url: string
          id?: string
          is_active?: boolean
          live_url?: string | null
          name: string
          stars?: number | null
          technologies?: string[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          forks?: number | null
          github_url?: string
          id?: string
          is_active?: boolean
          live_url?: string | null
          name?: string
          stars?: number | null
          technologies?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          color: string | null
          created_at: string
          display_order: number
          icon: string | null
          id: string
          is_active: boolean
          name: string
          proficiency_level: number
          updated_at: string
        }
        Insert: {
          category: string
          color?: string | null
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          is_active?: boolean
          name: string
          proficiency_level: number
          updated_at?: string
        }
        Update: {
          category?: string
          color?: string | null
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: string
          proficiency_level?: number
          updated_at?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          color: string
          created_at: string
          display_order: number
          icon: string
          id: string
          is_active: boolean
          platform: string
          updated_at: string
          url: string
        }
        Insert: {
          color: string
          created_at?: string
          display_order?: number
          icon: string
          id?: string
          is_active?: boolean
          platform: string
          updated_at?: string
          url: string
        }
        Update: {
          color?: string
          created_at?: string
          display_order?: number
          icon?: string
          id?: string
          is_active?: boolean
          platform?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      soft_skills: {
        Row: {
          color: string
          created_at: string
          description: string
          display_order: number
          icon: string
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          color: string
          created_at?: string
          description: string
          display_order?: number
          icon: string
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string
          display_order?: number
          icon?: string
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      tech_focus: {
        Row: {
          created_at: string
          description: string
          display_order: number
          icon: string
          id: string
          is_active: boolean
          technologies: string[]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number
          icon: string
          id?: string
          is_active?: boolean
          technologies?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          icon?: string
          id?: string
          is_active?: boolean
          technologies?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
