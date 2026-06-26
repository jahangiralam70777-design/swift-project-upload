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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_events: {
        Row: {
          created_at: string
          device: string | null
          element_id: string | null
          element_label: string | null
          element_role: string | null
          event_type: string
          id: string
          metadata: Json
          module: string | null
          page_path: string | null
          page_url: string | null
          referrer: string | null
          target_id: string | null
          target_kind: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          device?: string | null
          element_id?: string | null
          element_label?: string | null
          element_role?: string | null
          event_type: string
          id?: string
          metadata?: Json
          module?: string | null
          page_path?: string | null
          page_url?: string | null
          referrer?: string | null
          target_id?: string | null
          target_kind?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          device?: string | null
          element_id?: string | null
          element_label?: string | null
          element_role?: string | null
          event_type?: string
          id?: string
          metadata?: Json
          module?: string | null
          page_path?: string | null
          page_url?: string | null
          referrer?: string | null
          target_id?: string | null
          target_kind?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      admin_action_log: {
        Row: {
          action: string | null
          allowed: boolean
          created_at: string
          id: string
          metadata: Json | null
          permission: string
          user_id: string | null
        }
        Insert: {
          action?: string | null
          allowed?: boolean
          created_at?: string
          id?: string
          metadata?: Json | null
          permission?: string
          user_id?: string | null
        }
        Update: {
          action?: string | null
          allowed?: boolean
          created_at?: string
          id?: string
          metadata?: Json | null
          permission?: string
          user_id?: string | null
        }
        Relationships: []
      }
      app_pages: {
        Row: {
          created_at: string
          description: string | null
          enabled: boolean
          group: string
          key: string
          label: string
          route: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          group?: string
          key: string
          label: string
          route: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          group?: string
          key?: string
          label?: string
          route?: string
          updated_at?: string
        }
        Relationships: []
      }
      auth_access_controls: {
        Row: {
          created_at: string
          id: number
          login_auto_enable_at: string | null
          login_enabled: boolean
          login_message_description: string
          login_message_footer: string
          login_message_subtitle: string
          login_message_title: string
          signup_auto_enable_at: string | null
          signup_enabled: boolean
          signup_message_description: string
          signup_message_footer: string
          signup_message_subtitle: string
          signup_message_title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          login_auto_enable_at?: string | null
          login_enabled?: boolean
          login_message_description?: string
          login_message_footer?: string
          login_message_subtitle?: string
          login_message_title?: string
          signup_auto_enable_at?: string | null
          signup_enabled?: boolean
          signup_message_description?: string
          signup_message_footer?: string
          signup_message_subtitle?: string
          signup_message_title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          login_auto_enable_at?: string | null
          login_enabled?: boolean
          login_message_description?: string
          login_message_footer?: string
          login_message_subtitle?: string
          login_message_title?: string
          signup_auto_enable_at?: string | null
          signup_enabled?: boolean
          signup_message_description?: string
          signup_message_footer?: string
          signup_message_subtitle?: string
          signup_message_title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      avatars: {
        Row: {
          created_at: string
          id: string
          label: string | null
          sort_order: number
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          label?: string | null
          sort_order?: number
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string | null
          sort_order?: number
          url?: string
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      blog_tags: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      chapters: {
        Row: {
          description: string | null
          id: string
          name: string
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          subject_id: string
          updated_at: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          subject_id: string
          updated_at?: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          subject_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapters_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      flash_card_visibility: {
        Row: {
          hidden_chapter_ids: string[]
          hidden_levels: string[]
          hidden_subject_ids: string[]
          id: number
          section_hidden: boolean
          updated_at: string
        }
        Insert: {
          hidden_chapter_ids?: string[]
          hidden_levels?: string[]
          hidden_subject_ids?: string[]
          id?: number
          section_hidden?: boolean
          updated_at?: string
        }
        Update: {
          hidden_chapter_ids?: string[]
          hidden_levels?: string[]
          hidden_subject_ids?: string[]
          id?: number
          section_hidden?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      homepage_sections: {
        Row: {
          content: Json
          draft_content: Json | null
          key: string
          label: string
          position: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          content?: Json
          draft_content?: Json | null
          key: string
          label: string
          position?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          content?: Json
          draft_content?: Json | null
          key?: string
          label?: string
          position?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      levels: {
        Row: {
          code: string
          color: string | null
          description: string | null
          icon: string | null
          name: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          code: string
          color?: string | null
          description?: string | null
          icon?: string | null
          name: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          code?: string
          color?: string | null
          description?: string | null
          icon?: string | null
          name?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
      module_visibility: {
        Row: {
          hidden: boolean
          key: string
          label: string
          updated_at: string
        }
        Insert: {
          hidden?: boolean
          key: string
          label: string
          updated_at?: string
        }
        Update: {
          hidden?: boolean
          key?: string
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_access: {
        Row: {
          created_at: string
          page_key: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          created_at?: string
          page_key: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          created_at?: string
          page_key?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: [
          {
            foreignKeyName: "page_access_page_key_fkey"
            columns: ["page_key"]
            isOneToOne: false
            referencedRelation: "app_pages"
            referencedColumns: ["key"]
          },
        ]
      }
      permission_audit_log: {
        Row: {
          action: string
          actor_email: string | null
          actor_id: string | null
          created_at: string
          id: string
          metadata: Json
          target_page: string | null
          target_permission: string | null
          target_role: Database["public"]["Enums"]["app_role"] | null
          target_user_id: string | null
        }
        Insert: {
          action: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          target_page?: string | null
          target_permission?: string | null
          target_role?: Database["public"]["Enums"]["app_role"] | null
          target_user_id?: string | null
        }
        Update: {
          action?: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          target_page?: string | null
          target_permission?: string | null
          target_role?: Database["public"]["Enums"]["app_role"] | null
          target_user_id?: string | null
        }
        Relationships: []
      }
      question_bank_visibility: {
        Row: {
          hidden_chapter_ids: string[]
          hidden_levels: string[]
          hidden_subject_ids: string[]
          id: number
          section_hidden: boolean
          updated_at: string
        }
        Insert: {
          hidden_chapter_ids?: string[]
          hidden_levels?: string[]
          hidden_subject_ids?: string[]
          id?: number
          section_hidden?: boolean
          updated_at?: string
        }
        Update: {
          hidden_chapter_ids?: string[]
          hidden_levels?: string[]
          hidden_subject_ids?: string[]
          id?: number
          section_hidden?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          created_at: string
          permission: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          permission: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          permission?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: []
      }
      short_notes_visibility: {
        Row: {
          hidden_chapter_ids: string[]
          hidden_levels: string[]
          hidden_subject_ids: string[]
          id: number
          section_hidden: boolean
          updated_at: string
        }
        Insert: {
          hidden_chapter_ids?: string[]
          hidden_levels?: string[]
          hidden_subject_ids?: string[]
          id?: number
          section_hidden?: boolean
          updated_at?: string
        }
        Update: {
          hidden_chapter_ids?: string[]
          hidden_levels?: string[]
          hidden_subject_ids?: string[]
          id?: number
          section_hidden?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      site_page_sections: {
        Row: {
          content: Json
          created_at: string
          id: string
          kind: string
          page_id: string
          sort_order: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          kind: string
          page_id: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          kind?: string
          page_id?: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "site_page_sections_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "site_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      site_pages: {
        Row: {
          created_at: string
          id: string
          is_home: boolean
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_home?: boolean
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_home?: boolean
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      study_sessions: {
        Row: {
          chapter_id: string | null
          created_at: string
          duration_seconds: number
          ended_at: string | null
          id: string
          last_heartbeat_at: string
          meta: Json
          module: string
          started_at: string
          subject_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          chapter_id?: string | null
          created_at?: string
          duration_seconds?: number
          ended_at?: string | null
          id?: string
          last_heartbeat_at?: string
          meta?: Json
          module?: string
          started_at?: string
          subject_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          chapter_id?: string | null
          created_at?: string
          duration_seconds?: number
          ended_at?: string | null
          id?: string
          last_heartbeat_at?: string
          meta?: Json
          module?: string
          started_at?: string
          subject_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subjects: {
        Row: {
          color: string | null
          description: string | null
          icon: string | null
          id: string
          level: string
          name: string
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          color?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          level?: string
          name: string
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          color?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          level?: string
          name?: string
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subjects_level_fkey"
            columns: ["level"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["code"]
          },
        ]
      }
      user_login_events: {
        Row: {
          browser: string | null
          created_at: string
          device: string | null
          duration_seconds: number | null
          id: string
          ip: string | null
          login_at: string
          logout_at: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          browser?: string | null
          created_at?: string
          device?: string | null
          duration_seconds?: number | null
          id?: string
          ip?: string | null
          login_at?: string
          logout_at?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          browser?: string | null
          created_at?: string
          device?: string | null
          duration_seconds?: number | null
          id?: string
          ip?: string | null
          login_at?: string
          logout_at?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      video_class_visibility: {
        Row: {
          hidden_chapter_ids: string[]
          hidden_levels: string[]
          hidden_subject_ids: string[]
          id: number
          section_hidden: boolean
          updated_at: string
        }
        Insert: {
          hidden_chapter_ids?: string[]
          hidden_levels?: string[]
          hidden_subject_ids?: string[]
          id?: number
          section_hidden?: boolean
          updated_at?: string
        }
        Update: {
          hidden_chapter_ids?: string[]
          hidden_levels?: string[]
          hidden_subject_ids?: string[]
          id?: number
          section_hidden?: boolean
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      _lovable_import_exec: { Args: { q: string }; Returns: undefined }
      _tmp_exec_sql: { Args: { sql: string }; Returns: undefined }
      admin_get_db_size: { Args: never; Returns: number }
      admin_get_table_sizes: {
        Args: never
        Returns: {
          row_estimate: number
          size_bytes: number
          table_name: string
        }[]
      }
      admin_global_search: {
        Args: { _limit?: number; _term: string }
        Returns: {
          id: string
          snippet: string
          table_name: string
        }[]
      }
      admin_hard_delete_user: { Args: { _id: string }; Returns: undefined }
      admin_list_public_tables: {
        Args: never
        Returns: {
          rls_enabled: boolean
          row_estimate: number
          size_bytes: number
          table_name: string
        }[]
      }
      admin_list_user_roles: {
        Args: { _role?: Database["public"]["Enums"]["app_role"] }
        Returns: {
          assigned_at: string
          display_name: string
          email: string
          full_name: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }[]
      }
      admin_log_system_error: {
        Args: {
          _fingerprint?: string
          _message: string
          _payload?: Json
          _route?: string
          _severity: string
          _source: string
          _stack?: string
          _user_agent?: string
        }
        Returns: string
      }
      admin_restore_user: { Args: { _id: string }; Returns: undefined }
      admin_soft_delete_user: { Args: { _id: string }; Returns: undefined }
      admin_table_metadata: { Args: { _table: string }; Returns: Json }
      admin_user_analytics: { Args: never; Returns: Json }
      auth_controls_can_bypass_student_gate: {
        Args: { _user_id: string }
        Returns: boolean
      }
      auth_controls_can_manage: { Args: { _user_id: string }; Returns: boolean }
      blog_increment_view: { Args: { _post_id: string }; Returns: undefined }
      get_auth_access_controls: {
        Args: never
        Returns: {
          created_at: string
          id: number
          login_auto_enable_at: string | null
          login_enabled: boolean
          login_message_description: string
          login_message_footer: string
          login_message_subtitle: string
          login_message_title: string
          signup_auto_enable_at: string | null
          signup_enabled: boolean
          signup_message_description: string
          signup_message_footer: string
          signup_message_subtitle: string
          signup_message_title: string
          updated_at: string
          updated_by: string | null
        }
        SetofOptions: {
          from: "*"
          to: "auth_access_controls"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      has_page_access: {
        Args: { _page_key: string; _user_id: string }
        Returns: boolean
      }
      has_permission: {
        Args: { _permission: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      hook_before_user_created: { Args: { event: Json }; Returns: Json }
      hook_password_verification_attempt: {
        Args: { event: Json }
        Returns: Json
      }
      list_my_pages: {
        Args: never
        Returns: {
          page_key: string
        }[]
      }
      list_my_permissions: {
        Args: never
        Returns: {
          permission: string
        }[]
      }
      record_admin_action: {
        Args: {
          _action: string
          _allowed: boolean
          _metadata?: Json
          _permission: string
        }
        Returns: undefined
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      update_auth_access_controls: {
        Args: { _payload: Json }
        Returns: {
          created_at: string
          id: number
          login_auto_enable_at: string | null
          login_enabled: boolean
          login_message_description: string
          login_message_footer: string
          login_message_subtitle: string
          login_message_title: string
          signup_auto_enable_at: string | null
          signup_enabled: boolean
          signup_message_description: string
          signup_message_footer: string
          signup_message_subtitle: string
          signup_message_title: string
          updated_at: string
          updated_by: string | null
        }
        SetofOptions: {
          from: "*"
          to: "auth_access_controls"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "student" | "user" | "super_admin"
      attempt_kind:
        | "practice"
        | "quiz"
        | "mock"
        | "mcq_practice"
        | "custom_exam"
      attempt_status: "in_progress" | "completed" | "abandoned"
      card_type:
        | "concept"
        | "formula"
        | "diagram"
        | "timeline"
        | "definition"
        | "other"
      content_status: "draft" | "published" | "archived"
      difficulty: "easy" | "medium" | "hard"
      difficulty_level: "easy" | "medium" | "hard"
      mcq_option: "A" | "B" | "C" | "D"
      note_kind: "text" | "pdf" | "doc"
      notification_audience: "all" | "level" | "subject" | "role" | "users"
      notification_priority: "low" | "medium" | "high" | "critical"
      notification_status: "draft" | "scheduled" | "sent" | "failed" | "paused"
      notification_type: "announcement" | "push" | "email" | "in_app"
      profile_status: "active" | "suspended" | "pending"
      qb_resource_type: "important" | "pyq" | "model" | "notes" | "text"
      question_type: "mcq" | "true_false"
      quiz_kind: "quiz" | "mock"
      video_kind: "youtube" | "playlist" | "upload"
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
      app_role: ["admin", "moderator", "student", "user", "super_admin"],
      attempt_kind: ["practice", "quiz", "mock", "mcq_practice", "custom_exam"],
      attempt_status: ["in_progress", "completed", "abandoned"],
      card_type: [
        "concept",
        "formula",
        "diagram",
        "timeline",
        "definition",
        "other",
      ],
      content_status: ["draft", "published", "archived"],
      difficulty: ["easy", "medium", "hard"],
      difficulty_level: ["easy", "medium", "hard"],
      mcq_option: ["A", "B", "C", "D"],
      note_kind: ["text", "pdf", "doc"],
      notification_audience: ["all", "level", "subject", "role", "users"],
      notification_priority: ["low", "medium", "high", "critical"],
      notification_status: ["draft", "scheduled", "sent", "failed", "paused"],
      notification_type: ["announcement", "push", "email", "in_app"],
      profile_status: ["active", "suspended", "pending"],
      qb_resource_type: ["important", "pyq", "model", "notes", "text"],
      question_type: ["mcq", "true_false"],
      quiz_kind: ["quiz", "mock"],
      video_kind: ["youtube", "playlist", "upload"],
    },
  },
} as const
