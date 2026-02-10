--
-- PostgreSQL database dump
--

\restrict dTg2qrP3BLu5Yya8S6xL73P4lfqYfJr8Ufd4gBdyjYPXl0gVKRBB5IoIE7Quq2f

-- Dumped from database version 15.15
-- Dumped by pg_dump version 15.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: actualites; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.actualites (
    id integer NOT NULL,
    slug character varying(255) NOT NULL,
    titre character varying(255) NOT NULL,
    sous_titre character varying(255),
    date timestamp without time zone,
    body text,
    image uuid,
    categorie character varying(255)
);


ALTER TABLE public.actualites OWNER TO directus;

--
-- Name: actualites_id_seq; Type: SEQUENCE; Schema: public; Owner: directus
--

CREATE SEQUENCE public.actualites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.actualites_id_seq OWNER TO directus;

--
-- Name: actualites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: directus
--

ALTER SEQUENCE public.actualites_id_seq OWNED BY public.actualites.id;


--
-- Name: directus_access; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_access (
    id uuid NOT NULL,
    role uuid,
    "user" uuid,
    policy uuid NOT NULL,
    sort integer
);


ALTER TABLE public.directus_access OWNER TO directus;

--
-- Name: directus_activity; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_activity (
    id integer NOT NULL,
    action character varying(45) NOT NULL,
    "user" uuid,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ip character varying(50),
    user_agent text,
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    origin character varying(255)
);


ALTER TABLE public.directus_activity OWNER TO directus;

--
-- Name: directus_activity_id_seq; Type: SEQUENCE; Schema: public; Owner: directus
--

CREATE SEQUENCE public.directus_activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_activity_id_seq OWNER TO directus;

--
-- Name: directus_activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: directus
--

ALTER SEQUENCE public.directus_activity_id_seq OWNED BY public.directus_activity.id;


--
-- Name: directus_collections; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_collections (
    collection character varying(64) NOT NULL,
    icon character varying(64),
    note text,
    display_template character varying(255),
    hidden boolean DEFAULT false NOT NULL,
    singleton boolean DEFAULT false NOT NULL,
    translations json,
    archive_field character varying(64),
    archive_app_filter boolean DEFAULT true NOT NULL,
    archive_value character varying(255),
    unarchive_value character varying(255),
    sort_field character varying(64),
    accountability character varying(255) DEFAULT 'all'::character varying,
    color character varying(255),
    item_duplication_fields json,
    sort integer,
    "group" character varying(64),
    collapse character varying(255) DEFAULT 'open'::character varying NOT NULL,
    preview_url character varying(255),
    versioning boolean DEFAULT false NOT NULL
);


ALTER TABLE public.directus_collections OWNER TO directus;

--
-- Name: directus_comments; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_comments (
    id uuid NOT NULL,
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    comment text NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid,
    user_updated uuid
);


ALTER TABLE public.directus_comments OWNER TO directus;

--
-- Name: directus_dashboards; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_dashboards (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    icon character varying(64) DEFAULT 'dashboard'::character varying NOT NULL,
    note text,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid,
    color character varying(255)
);


ALTER TABLE public.directus_dashboards OWNER TO directus;

--
-- Name: directus_extensions; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_extensions (
    enabled boolean DEFAULT true NOT NULL,
    id uuid NOT NULL,
    folder character varying(255) NOT NULL,
    source character varying(255) NOT NULL,
    bundle uuid
);


ALTER TABLE public.directus_extensions OWNER TO directus;

--
-- Name: directus_fields; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_fields (
    id integer NOT NULL,
    collection character varying(64) NOT NULL,
    field character varying(64) NOT NULL,
    special character varying(64),
    interface character varying(64),
    options json,
    display character varying(64),
    display_options json,
    readonly boolean DEFAULT false NOT NULL,
    hidden boolean DEFAULT false NOT NULL,
    sort integer,
    width character varying(30) DEFAULT 'full'::character varying,
    translations json,
    note text,
    conditions json,
    required boolean DEFAULT false,
    "group" character varying(64),
    validation json,
    validation_message text,
    searchable boolean DEFAULT true NOT NULL
);


ALTER TABLE public.directus_fields OWNER TO directus;

--
-- Name: directus_fields_id_seq; Type: SEQUENCE; Schema: public; Owner: directus
--

CREATE SEQUENCE public.directus_fields_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_fields_id_seq OWNER TO directus;

--
-- Name: directus_fields_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: directus
--

ALTER SEQUENCE public.directus_fields_id_seq OWNED BY public.directus_fields.id;


--
-- Name: directus_files; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_files (
    id uuid NOT NULL,
    storage character varying(255) NOT NULL,
    filename_disk character varying(255),
    filename_download character varying(255) NOT NULL,
    title character varying(255),
    type character varying(255),
    folder uuid,
    uploaded_by uuid,
    created_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by uuid,
    modified_on timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    charset character varying(50),
    filesize bigint,
    width integer,
    height integer,
    duration integer,
    embed character varying(200),
    description text,
    location text,
    tags text,
    metadata json,
    focal_point_x integer,
    focal_point_y integer,
    tus_id character varying(64),
    tus_data json,
    uploaded_on timestamp with time zone
);


ALTER TABLE public.directus_files OWNER TO directus;

--
-- Name: directus_flows; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_flows (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    icon character varying(64),
    color character varying(255),
    description text,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    trigger character varying(255),
    accountability character varying(255) DEFAULT 'all'::character varying,
    options json,
    operation uuid,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid
);


ALTER TABLE public.directus_flows OWNER TO directus;

--
-- Name: directus_folders; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_folders (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    parent uuid
);


ALTER TABLE public.directus_folders OWNER TO directus;

--
-- Name: directus_migrations; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_migrations (
    version character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.directus_migrations OWNER TO directus;

--
-- Name: directus_notifications; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_notifications (
    id integer NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(255) DEFAULT 'inbox'::character varying,
    recipient uuid NOT NULL,
    sender uuid,
    subject character varying(255) NOT NULL,
    message text,
    collection character varying(64),
    item character varying(255)
);


ALTER TABLE public.directus_notifications OWNER TO directus;

--
-- Name: directus_notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: directus
--

CREATE SEQUENCE public.directus_notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_notifications_id_seq OWNER TO directus;

--
-- Name: directus_notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: directus
--

ALTER SEQUENCE public.directus_notifications_id_seq OWNED BY public.directus_notifications.id;


--
-- Name: directus_operations; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_operations (
    id uuid NOT NULL,
    name character varying(255),
    key character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    position_x integer NOT NULL,
    position_y integer NOT NULL,
    options json,
    resolve uuid,
    reject uuid,
    flow uuid NOT NULL,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid
);


ALTER TABLE public.directus_operations OWNER TO directus;

--
-- Name: directus_panels; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_panels (
    id uuid NOT NULL,
    dashboard uuid NOT NULL,
    name character varying(255),
    icon character varying(64) DEFAULT NULL::character varying,
    color character varying(10),
    show_header boolean DEFAULT false NOT NULL,
    note text,
    type character varying(255) NOT NULL,
    position_x integer NOT NULL,
    position_y integer NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL,
    options json,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid
);


ALTER TABLE public.directus_panels OWNER TO directus;

--
-- Name: directus_permissions; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_permissions (
    id integer NOT NULL,
    collection character varying(64) NOT NULL,
    action character varying(10) NOT NULL,
    permissions json,
    validation json,
    presets json,
    fields text,
    policy uuid NOT NULL
);


ALTER TABLE public.directus_permissions OWNER TO directus;

--
-- Name: directus_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: directus
--

CREATE SEQUENCE public.directus_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_permissions_id_seq OWNER TO directus;

--
-- Name: directus_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: directus
--

ALTER SEQUENCE public.directus_permissions_id_seq OWNED BY public.directus_permissions.id;


--
-- Name: directus_policies; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_policies (
    id uuid NOT NULL,
    name character varying(100) NOT NULL,
    icon character varying(64) DEFAULT 'badge'::character varying NOT NULL,
    description text,
    ip_access text,
    enforce_tfa boolean DEFAULT false NOT NULL,
    admin_access boolean DEFAULT false NOT NULL,
    app_access boolean DEFAULT false NOT NULL
);


ALTER TABLE public.directus_policies OWNER TO directus;

--
-- Name: directus_presets; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_presets (
    id integer NOT NULL,
    bookmark character varying(255),
    "user" uuid,
    role uuid,
    collection character varying(64),
    search character varying(100),
    layout character varying(100) DEFAULT 'tabular'::character varying,
    layout_query json,
    layout_options json,
    refresh_interval integer,
    filter json,
    icon character varying(64) DEFAULT 'bookmark'::character varying,
    color character varying(255)
);


ALTER TABLE public.directus_presets OWNER TO directus;

--
-- Name: directus_presets_id_seq; Type: SEQUENCE; Schema: public; Owner: directus
--

CREATE SEQUENCE public.directus_presets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_presets_id_seq OWNER TO directus;

--
-- Name: directus_presets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: directus
--

ALTER SEQUENCE public.directus_presets_id_seq OWNED BY public.directus_presets.id;


--
-- Name: directus_relations; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_relations (
    id integer NOT NULL,
    many_collection character varying(64) NOT NULL,
    many_field character varying(64) NOT NULL,
    one_collection character varying(64),
    one_field character varying(64),
    one_collection_field character varying(64),
    one_allowed_collections text,
    junction_field character varying(64),
    sort_field character varying(64),
    one_deselect_action character varying(255) DEFAULT 'nullify'::character varying NOT NULL
);


ALTER TABLE public.directus_relations OWNER TO directus;

--
-- Name: directus_relations_id_seq; Type: SEQUENCE; Schema: public; Owner: directus
--

CREATE SEQUENCE public.directus_relations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_relations_id_seq OWNER TO directus;

--
-- Name: directus_relations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: directus
--

ALTER SEQUENCE public.directus_relations_id_seq OWNED BY public.directus_relations.id;


--
-- Name: directus_revisions; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_revisions (
    id integer NOT NULL,
    activity integer NOT NULL,
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    data json,
    delta json,
    parent integer,
    version uuid
);


ALTER TABLE public.directus_revisions OWNER TO directus;

--
-- Name: directus_revisions_id_seq; Type: SEQUENCE; Schema: public; Owner: directus
--

CREATE SEQUENCE public.directus_revisions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_revisions_id_seq OWNER TO directus;

--
-- Name: directus_revisions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: directus
--

ALTER SEQUENCE public.directus_revisions_id_seq OWNED BY public.directus_revisions.id;


--
-- Name: directus_roles; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_roles (
    id uuid NOT NULL,
    name character varying(100) NOT NULL,
    icon character varying(64) DEFAULT 'supervised_user_circle'::character varying NOT NULL,
    description text,
    parent uuid
);


ALTER TABLE public.directus_roles OWNER TO directus;

--
-- Name: directus_sessions; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_sessions (
    token character varying(64) NOT NULL,
    "user" uuid,
    expires timestamp with time zone NOT NULL,
    ip character varying(255),
    user_agent text,
    share uuid,
    origin character varying(255),
    next_token character varying(64)
);


ALTER TABLE public.directus_sessions OWNER TO directus;

--
-- Name: directus_settings; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_settings (
    id integer NOT NULL,
    project_name character varying(100) DEFAULT 'Directus'::character varying NOT NULL,
    project_url character varying(255),
    project_color character varying(255) DEFAULT '#6644FF'::character varying NOT NULL,
    project_logo uuid,
    public_foreground uuid,
    public_background uuid,
    public_note text,
    auth_login_attempts integer DEFAULT 25,
    auth_password_policy character varying(100),
    storage_asset_transform character varying(7) DEFAULT 'all'::character varying,
    storage_asset_presets json,
    custom_css text,
    storage_default_folder uuid,
    basemaps json,
    mapbox_key character varying(255),
    module_bar json,
    project_descriptor character varying(100),
    default_language character varying(255) DEFAULT 'en-US'::character varying NOT NULL,
    custom_aspect_ratios json,
    public_favicon uuid,
    default_appearance character varying(255) DEFAULT 'auto'::character varying NOT NULL,
    default_theme_light character varying(255),
    theme_light_overrides json,
    default_theme_dark character varying(255),
    theme_dark_overrides json,
    report_error_url character varying(255),
    report_bug_url character varying(255),
    report_feature_url character varying(255),
    public_registration boolean DEFAULT false NOT NULL,
    public_registration_verify_email boolean DEFAULT true NOT NULL,
    public_registration_role uuid,
    public_registration_email_filter json,
    visual_editor_urls json,
    project_id uuid,
    mcp_enabled boolean DEFAULT false NOT NULL,
    mcp_allow_deletes boolean DEFAULT false NOT NULL,
    mcp_prompts_collection character varying(255) DEFAULT NULL::character varying,
    mcp_system_prompt_enabled boolean DEFAULT true NOT NULL,
    mcp_system_prompt text,
    project_owner character varying(255),
    project_usage character varying(255),
    org_name character varying(255),
    product_updates boolean,
    project_status character varying(255),
    ai_openai_api_key text,
    ai_anthropic_api_key text,
    ai_system_prompt text
);


ALTER TABLE public.directus_settings OWNER TO directus;

--
-- Name: directus_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: directus
--

CREATE SEQUENCE public.directus_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directus_settings_id_seq OWNER TO directus;

--
-- Name: directus_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: directus
--

ALTER SEQUENCE public.directus_settings_id_seq OWNED BY public.directus_settings.id;


--
-- Name: directus_shares; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_shares (
    id uuid NOT NULL,
    name character varying(255),
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    role uuid,
    password character varying(255),
    user_created uuid,
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_start timestamp with time zone,
    date_end timestamp with time zone,
    times_used integer DEFAULT 0,
    max_uses integer
);


ALTER TABLE public.directus_shares OWNER TO directus;

--
-- Name: directus_translations; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_translations (
    id uuid NOT NULL,
    language character varying(255) NOT NULL,
    key character varying(255) NOT NULL,
    value text NOT NULL
);


ALTER TABLE public.directus_translations OWNER TO directus;

--
-- Name: directus_users; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_users (
    id uuid NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    email character varying(128),
    password character varying(255),
    location character varying(255),
    title character varying(50),
    description text,
    tags json,
    avatar uuid,
    language character varying(255) DEFAULT NULL::character varying,
    tfa_secret character varying(255),
    status character varying(16) DEFAULT 'active'::character varying NOT NULL,
    role uuid,
    token character varying(255),
    last_access timestamp with time zone,
    last_page character varying(255),
    provider character varying(128) DEFAULT 'default'::character varying NOT NULL,
    external_identifier character varying(255),
    auth_data json,
    email_notifications boolean DEFAULT true,
    appearance character varying(255),
    theme_dark character varying(255),
    theme_light character varying(255),
    theme_light_overrides json,
    theme_dark_overrides json,
    text_direction character varying(255) DEFAULT 'auto'::character varying NOT NULL
);


ALTER TABLE public.directus_users OWNER TO directus;

--
-- Name: directus_versions; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.directus_versions (
    id uuid NOT NULL,
    key character varying(64) NOT NULL,
    name character varying(255),
    collection character varying(64) NOT NULL,
    item character varying(255) NOT NULL,
    hash character varying(255),
    date_created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    date_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_created uuid,
    user_updated uuid,
    delta json
);


ALTER TABLE public.directus_versions OWNER TO directus;

--
-- Name: home_settings; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.home_settings (
    id integer NOT NULL
);


ALTER TABLE public.home_settings OWNER TO directus;

--
-- Name: home_settings_files; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.home_settings_files (
    id integer NOT NULL,
    home_settings_id integer NOT NULL,
    directus_files_id uuid NOT NULL,
    sort integer
);


ALTER TABLE public.home_settings_files OWNER TO directus;

--
-- Name: home_settings_files_id_seq; Type: SEQUENCE; Schema: public; Owner: directus
--

CREATE SEQUENCE public.home_settings_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.home_settings_files_id_seq OWNER TO directus;

--
-- Name: home_settings_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: directus
--

ALTER SEQUENCE public.home_settings_files_id_seq OWNED BY public.home_settings_files.id;


--
-- Name: home_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: directus
--

CREATE SEQUENCE public.home_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.home_settings_id_seq OWNER TO directus;

--
-- Name: home_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: directus
--

ALTER SEQUENCE public.home_settings_id_seq OWNED BY public.home_settings.id;


--
-- Name: mediations; Type: TABLE; Schema: public; Owner: directus
--

CREATE TABLE public.mediations (
    id integer NOT NULL,
    slug character varying(255) NOT NULL,
    titre character varying(255) NOT NULL,
    sous_titre character varying(255),
    date timestamp without time zone,
    body text,
    image uuid,
    video uuid,
    categorie character varying(255)
);


ALTER TABLE public.mediations OWNER TO directus;

--
-- Name: mediations_id_seq; Type: SEQUENCE; Schema: public; Owner: directus
--

CREATE SEQUENCE public.mediations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mediations_id_seq OWNER TO directus;

--
-- Name: mediations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: directus
--

ALTER SEQUENCE public.mediations_id_seq OWNED BY public.mediations.id;


--
-- Name: actualites id; Type: DEFAULT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.actualites ALTER COLUMN id SET DEFAULT nextval('public.actualites_id_seq'::regclass);


--
-- Name: directus_activity id; Type: DEFAULT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_activity ALTER COLUMN id SET DEFAULT nextval('public.directus_activity_id_seq'::regclass);


--
-- Name: directus_fields id; Type: DEFAULT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_fields ALTER COLUMN id SET DEFAULT nextval('public.directus_fields_id_seq'::regclass);


--
-- Name: directus_notifications id; Type: DEFAULT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_notifications ALTER COLUMN id SET DEFAULT nextval('public.directus_notifications_id_seq'::regclass);


--
-- Name: directus_permissions id; Type: DEFAULT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_permissions ALTER COLUMN id SET DEFAULT nextval('public.directus_permissions_id_seq'::regclass);


--
-- Name: directus_presets id; Type: DEFAULT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_presets ALTER COLUMN id SET DEFAULT nextval('public.directus_presets_id_seq'::regclass);


--
-- Name: directus_relations id; Type: DEFAULT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_relations ALTER COLUMN id SET DEFAULT nextval('public.directus_relations_id_seq'::regclass);


--
-- Name: directus_revisions id; Type: DEFAULT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_revisions ALTER COLUMN id SET DEFAULT nextval('public.directus_revisions_id_seq'::regclass);


--
-- Name: directus_settings id; Type: DEFAULT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_settings ALTER COLUMN id SET DEFAULT nextval('public.directus_settings_id_seq'::regclass);


--
-- Name: home_settings id; Type: DEFAULT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.home_settings ALTER COLUMN id SET DEFAULT nextval('public.home_settings_id_seq'::regclass);


--
-- Name: home_settings_files id; Type: DEFAULT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.home_settings_files ALTER COLUMN id SET DEFAULT nextval('public.home_settings_files_id_seq'::regclass);


--
-- Name: mediations id; Type: DEFAULT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.mediations ALTER COLUMN id SET DEFAULT nextval('public.mediations_id_seq'::regclass);


--
-- Data for Name: actualites; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.actualites (id, slug, titre, sous_titre, date, body, image, categorie) FROM stdin;
\.


--
-- Data for Name: directus_access; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_access (id, role, "user", policy, sort) FROM stdin;
42db5c20-b807-4332-861e-87c99c4237af	\N	\N	abf8a154-5b1c-4a46-ac9c-7300570f4f17	1
6a6eb06a-0439-4768-98b4-721db2d85752	fd98cdf0-be10-450e-a724-7047266d3e1d	\N	72a1aa8f-b28d-4b84-bc7d-5ec2db1cc3d4	\N
\.


--
-- Data for Name: directus_activity; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_activity (id, action, "user", "timestamp", ip, user_agent, collection, item, origin) FROM stdin;
1	login	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:25:50.165+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_users	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	https://api.123soleil-cinema.fr
2	login	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:27:05.355+00	172.18.0.4	node	directus_users	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	\N
3	login	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:27:15.525+00	172.18.0.4	node	directus_users	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	\N
4	login	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:52.58+00	172.18.0.4	node	directus_users	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	\N
5	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:52.997+00	172.18.0.4	node	directus_fields	1	\N
6	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:53.005+00	172.18.0.4	node	directus_collections	mediations	\N
7	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:53.101+00	172.18.0.4	node	directus_fields	2	\N
8	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:53.109+00	172.18.0.4	node	directus_collections	actualites	\N
9	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:53.172+00	172.18.0.4	node	directus_fields	3	\N
10	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:53.179+00	172.18.0.4	node	directus_collections	home_settings	\N
11	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:53.251+00	172.18.0.4	node	directus_fields	4	\N
12	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:53.26+00	172.18.0.4	node	directus_collections	home_settings_files	\N
13	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:53.395+00	172.18.0.4	node	directus_fields	5	\N
14	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:53.523+00	172.18.0.4	node	directus_fields	6	\N
15	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:53.588+00	172.18.0.4	node	directus_fields	7	\N
16	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:53.712+00	172.18.0.4	node	directus_fields	8	\N
17	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:53.773+00	172.18.0.4	node	directus_fields	9	\N
18	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:53.836+00	172.18.0.4	node	directus_fields	10	\N
19	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:53.893+00	172.18.0.4	node	directus_fields	11	\N
20	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:53.948+00	172.18.0.4	node	directus_fields	12	\N
21	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:54.004+00	172.18.0.4	node	directus_fields	13	\N
22	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:54.058+00	172.18.0.4	node	directus_fields	14	\N
23	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:54.113+00	172.18.0.4	node	directus_fields	15	\N
24	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:54.181+00	172.18.0.4	node	directus_fields	16	\N
25	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:54.237+00	172.18.0.4	node	directus_fields	17	\N
26	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:54.296+00	172.18.0.4	node	directus_fields	18	\N
27	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:54.352+00	172.18.0.4	node	directus_fields	19	\N
28	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:54.406+00	172.18.0.4	node	directus_fields	20	\N
29	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:54.465+00	172.18.0.4	node	directus_fields	21	\N
30	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:54.518+00	172.18.0.4	node	directus_fields	22	\N
31	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:28:54.596+00	172.18.0.4	node	directus_fields	23	\N
32	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:32:11.899+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_collections	home_settings	https://api.123soleil-cinema.fr
33	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:32:11.912+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_collections	actualites	https://api.123soleil-cinema.fr
34	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:32:11.92+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_collections	home_settings_files	https://api.123soleil-cinema.fr
35	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:32:11.927+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_collections	mediations	https://api.123soleil-cinema.fr
36	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:32:13.585+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_collections	home_settings	https://api.123soleil-cinema.fr
37	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:32:13.591+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_collections	mediations	https://api.123soleil-cinema.fr
38	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:32:13.597+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_collections	actualites	https://api.123soleil-cinema.fr
39	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:32:13.603+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_collections	home_settings_files	https://api.123soleil-cinema.fr
40	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:39:39.561+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_permissions	1	https://api.123soleil-cinema.fr
41	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:39:39.568+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_permissions	2	https://api.123soleil-cinema.fr
42	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:39:39.574+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_permissions	3	https://api.123soleil-cinema.fr
43	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:39:39.579+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_permissions	4	https://api.123soleil-cinema.fr
44	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 10:39:39.583+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_policies	abf8a154-5b1c-4a46-ac9c-7300570f4f17	https://api.123soleil-cinema.fr
45	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 11:12:08.628+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	1	https://api.123soleil-cinema.fr
46	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 11:12:45.266+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	83e578ce-24e3-4128-b475-f45d16f7dd13	https://api.123soleil-cinema.fr
47	login	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 11:23:59.801+00	172.18.0.1	node	directus_users	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	\N
48	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 11:24:14.92+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	e3d41498-3e27-4b5e-a586-d8e74932683d	https://api.123soleil-cinema.fr
49	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 11:24:17.683+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	1	https://api.123soleil-cinema.fr
50	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 11:38:29.233+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_permissions	5	https://api.123soleil-cinema.fr
51	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 11:38:29.24+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_permissions	6	https://api.123soleil-cinema.fr
52	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 11:38:29.244+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_policies	abf8a154-5b1c-4a46-ac9c-7300570f4f17	https://api.123soleil-cinema.fr
53	delete	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 11:38:54.339+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	1	https://api.123soleil-cinema.fr
54	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 11:39:16.481+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	27b10691-75cd-48e5-bab4-52bb3dfd7093	https://api.123soleil-cinema.fr
55	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 11:39:18.654+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	actualites	1	https://api.123soleil-cinema.fr
56	delete	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 11:39:29.423+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	actualites	1	https://api.123soleil-cinema.fr
57	delete	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 11:39:38.52+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	27b10691-75cd-48e5-bab4-52bb3dfd7093	https://api.123soleil-cinema.fr
58	delete	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 11:39:38.522+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	e3d41498-3e27-4b5e-a586-d8e74932683d	https://api.123soleil-cinema.fr
59	delete	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 11:39:38.523+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	83e578ce-24e3-4128-b475-f45d16f7dd13	https://api.123soleil-cinema.fr
60	login	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 15:38:21.646+00	77.205.21.166	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_users	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	https://api.123soleil-cinema.fr
61	login	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 15:40:30.716+00	77.205.21.166	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_users	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	https://api.123soleil-cinema.fr
62	login	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 15:41:32.767+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_users	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	https://api.123soleil-cinema.fr
63	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 15:41:43.232+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_settings	1	https://api.123soleil-cinema.fr
64	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 15:49:16.032+00	77.205.21.166	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	202c2c10-cc9b-4a6c-aca6-6221deb2a038	https://api.123soleil-cinema.fr
65	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 15:49:21.856+00	77.205.21.166	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	2	https://api.123soleil-cinema.fr
66	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 15:53:19.373+00	77.205.21.166	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	2	https://api.123soleil-cinema.fr
67	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 15:54:24.999+00	77.205.21.166	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	2	https://api.123soleil-cinema.fr
68	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 15:54:50.733+00	77.205.21.166	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	2	https://api.123soleil-cinema.fr
69	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 15:55:31.538+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	2	https://api.123soleil-cinema.fr
70	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 15:56:30.555+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_fields	15	https://api.123soleil-cinema.fr
71	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 15:56:57.59+00	77.205.21.166	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	2	https://api.123soleil-cinema.fr
72	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 16:34:49.208+00	77.205.21.92	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_settings	1	https://api.123soleil-cinema.fr
73	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 16:35:12.272+00	77.205.21.92	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_settings	1	https://api.123soleil-cinema.fr
74	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 16:35:15.804+00	77.205.21.92	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_settings	1	https://api.123soleil-cinema.fr
75	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:06:33.671+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	3	https://api.123soleil-cinema.fr
76	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:07:18.015+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	3	https://api.123soleil-cinema.fr
77	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:08:13.059+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	0a3eacd0-1db7-4673-8a24-06b5dec8555b	https://api.123soleil-cinema.fr
78	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:08:47.56+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	3	https://api.123soleil-cinema.fr
79	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:10:07.671+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	2	https://api.123soleil-cinema.fr
80	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:12:12.693+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	4	https://api.123soleil-cinema.fr
81	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:36:53.566+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	5	https://api.123soleil-cinema.fr
82	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:37:57.682+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	6	https://api.123soleil-cinema.fr
83	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:39:10.419+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	7	https://api.123soleil-cinema.fr
84	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:40:39.503+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	8	https://api.123soleil-cinema.fr
85	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:41:37.05+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	57ff286f-5605-4534-b6dc-b1f995141a1e	https://api.123soleil-cinema.fr
86	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:42:39.261+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_fields	15	https://api.123soleil-cinema.fr
87	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:43:39.385+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	d9251361-9796-49b9-b960-3781e7d07bab	https://api.123soleil-cinema.fr
88	delete	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:43:50.432+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	d9251361-9796-49b9-b960-3781e7d07bab	https://api.123soleil-cinema.fr
89	delete	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:43:50.434+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	57ff286f-5605-4534-b6dc-b1f995141a1e	https://api.123soleil-cinema.fr
90	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:46:18.678+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_settings	1	https://api.123soleil-cinema.fr
91	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:46:31.754+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_settings	1	https://api.123soleil-cinema.fr
92	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:46:41.077+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_settings	1	https://api.123soleil-cinema.fr
93	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:50:41.752+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	188f5cbd-bec3-44ca-8fe9-f72252b92f0f	https://api.123soleil-cinema.fr
94	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:51:36.654+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	fb3738a6-3ac0-4443-843e-ee987f405c7a	https://api.123soleil-cinema.fr
95	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:57:28.273+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	37b77938-7168-4525-b6ba-58d2062bf267	https://api.123soleil-cinema.fr
96	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:58:11.809+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	2	https://api.123soleil-cinema.fr
97	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:58:28.758+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	3	https://api.123soleil-cinema.fr
98	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:59:09.817+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	4	https://api.123soleil-cinema.fr
99	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:59:18.319+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	5	https://api.123soleil-cinema.fr
100	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:59:23.866+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	6	https://api.123soleil-cinema.fr
101	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:59:45.263+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	8	https://api.123soleil-cinema.fr
102	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 09:01:48.277+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_fields	15	https://api.123soleil-cinema.fr
103	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 09:03:48.995+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	4	https://api.123soleil-cinema.fr
104	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 09:03:59.746+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	5	https://api.123soleil-cinema.fr
105	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 09:04:03.787+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	6	https://api.123soleil-cinema.fr
106	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 09:04:15.095+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	8	https://api.123soleil-cinema.fr
107	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 13:10:00.325+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	b5866747-4647-4697-ac57-586f92e5aa2b	https://api.123soleil-cinema.fr
108	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 13:10:01.718+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	74f06d27-9b78-4970-8382-e1f06eb8918b	https://api.123soleil-cinema.fr
109	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 13:10:06.733+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	f9ce4826-96b0-4bfd-a2e8-08dfd2e2d36b	https://api.123soleil-cinema.fr
110	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 13:10:07.649+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	ec878bb7-2a34-4635-9c87-9ea528a35112	https://api.123soleil-cinema.fr
111	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 13:10:29.18+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	5	https://api.123soleil-cinema.fr
112	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 13:10:45.454+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	6	https://api.123soleil-cinema.fr
113	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 13:11:02.01+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	7	https://api.123soleil-cinema.fr
114	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 13:11:09.087+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	8	https://api.123soleil-cinema.fr
115	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 15:33:31.849+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	0a6a0f70-d167-4cb8-8a02-bb467b9f960c	https://api.123soleil-cinema.fr
116	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 15:36:37.022+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	5e14f07a-8783-4906-b175-76c6eaa42d6d	https://api.123soleil-cinema.fr
117	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 15:38:47.06+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	378b8233-d65d-4d8b-af6a-474e90d9c70b	https://api.123soleil-cinema.fr
118	create	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 15:41:42.185+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	directus_files	08c609ee-463a-4777-929d-fecf3ed6cb9e	https://api.123soleil-cinema.fr
119	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 16:19:06.759+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	5	https://api.123soleil-cinema.fr
120	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 16:19:22.349+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	6	https://api.123soleil-cinema.fr
121	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 16:19:46.168+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	7	https://api.123soleil-cinema.fr
122	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 16:20:13.858+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	8	https://api.123soleil-cinema.fr
123	update	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 16:21:05.236+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	mediations	7	https://api.123soleil-cinema.fr
\.


--
-- Data for Name: directus_collections; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_collections (collection, icon, note, display_template, hidden, singleton, translations, archive_field, archive_app_filter, archive_value, unarchive_value, sort_field, accountability, color, item_duplication_fields, sort, "group", collapse, preview_url, versioning) FROM stdin;
home_settings	home	Paramètres de la page d’accueil	\N	f	t	\N	\N	t	\N	\N	\N	all	\N	\N	1	\N	open	\N	f
mediations	video_library	Médiations (anciens projets Decap CMS)	\N	f	f	\N	\N	t	\N	\N	\N	all	\N	\N	2	\N	open	\N	f
actualites	feed	Actualités (Decap CMS)	\N	f	f	\N	\N	t	\N	\N	\N	all	\N	\N	3	\N	open	\N	f
home_settings_files	collections	Junction home_settings <-> directus_files	\N	t	f	\N	\N	t	\N	\N	\N	all	\N	\N	4	\N	open	\N	f
\.


--
-- Data for Name: directus_comments; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_comments (id, collection, item, comment, date_created, date_updated, user_created, user_updated) FROM stdin;
\.


--
-- Data for Name: directus_dashboards; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_dashboards (id, name, icon, note, date_created, user_created, color) FROM stdin;
\.


--
-- Data for Name: directus_extensions; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_extensions (enabled, id, folder, source, bundle) FROM stdin;
\.


--
-- Data for Name: directus_fields; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_fields (id, collection, field, special, interface, options, display, display_options, readonly, hidden, sort, width, translations, note, conditions, required, "group", validation, validation_message, searchable) FROM stdin;
1	mediations	id	\N	numeric	\N	\N	\N	t	t	1	full	\N	\N	\N	f	\N	\N	\N	t
2	actualites	id	\N	numeric	\N	\N	\N	t	t	1	full	\N	\N	\N	f	\N	\N	\N	t
3	home_settings	id	\N	numeric	\N	\N	\N	t	t	1	full	\N	\N	\N	f	\N	\N	\N	t
4	home_settings_files	id	\N	numeric	\N	\N	\N	t	t	1	full	\N	\N	\N	f	\N	\N	\N	t
5	home_settings_files	home_settings_id	\N	input	\N	\N	\N	f	f	2	full	\N	\N	\N	f	\N	\N	\N	t
6	home_settings_files	directus_files_id	\N	input	\N	\N	\N	f	f	3	full	\N	\N	\N	f	\N	\N	\N	t
7	home_settings_files	sort	\N	input	\N	\N	\N	f	f	4	full	\N	\N	\N	f	\N	\N	\N	t
8	mediations	slug	\N	input	\N	\N	\N	f	f	2	full	\N	\N	\N	t	\N	\N	\N	t
9	mediations	titre	\N	input	\N	\N	\N	f	f	3	full	\N	\N	\N	t	\N	\N	\N	t
10	mediations	sous_titre	\N	input	\N	\N	\N	f	f	4	full	\N	\N	\N	f	\N	\N	\N	t
11	mediations	date	\N	datetime	\N	\N	\N	f	f	5	full	\N	\N	\N	f	\N	\N	\N	t
12	mediations	body	\N	input-rich-text-md	\N	\N	\N	f	f	6	full	\N	\N	\N	f	\N	\N	\N	t
13	mediations	image	file	file-image	\N	\N	\N	f	f	7	full	\N	\N	\N	f	\N	\N	\N	t
14	mediations	video	file	file	\N	\N	\N	f	f	8	full	\N	\N	\N	f	\N	\N	\N	t
16	actualites	slug	\N	input	\N	\N	\N	f	f	2	full	\N	\N	\N	t	\N	\N	\N	t
17	actualites	titre	\N	input	\N	\N	\N	f	f	3	full	\N	\N	\N	t	\N	\N	\N	t
18	actualites	sous_titre	\N	input	\N	\N	\N	f	f	4	full	\N	\N	\N	f	\N	\N	\N	t
19	actualites	date	\N	datetime	\N	\N	\N	f	f	5	full	\N	\N	\N	f	\N	\N	\N	t
20	actualites	body	\N	input-rich-text-md	\N	\N	\N	f	f	6	full	\N	\N	\N	f	\N	\N	\N	t
21	actualites	image	file	file-image	\N	\N	\N	f	f	7	full	\N	\N	\N	f	\N	\N	\N	t
22	actualites	categorie	\N	input	\N	\N	\N	f	f	8	full	\N	\N	\N	f	\N	\N	\N	t
23	home_settings	hero_images	m2m	files	{"limit":10}	\N	\N	f	f	2	full	\N	\N	\N	f	\N	\N	\N	t
15	mediations	categorie	\N	select-dropdown	{"choices":[{"text":"Courts-métrages","value":"court-metrages"},{"text":"Lipdubs","value":"lipdubs"},{"text":"Médiations","value":"mediations"}]}	\N	\N	f	f	9	full	\N	\N	\N	f	\N	\N	\N	t
\.


--
-- Data for Name: directus_files; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_files (id, storage, filename_disk, filename_download, title, type, folder, uploaded_by, created_on, modified_by, modified_on, charset, filesize, width, height, duration, embed, description, location, tags, metadata, focal_point_x, focal_point_y, tus_id, tus_data, uploaded_on) FROM stdin;
378b8233-d65d-4d8b-af6a-474e90d9c70b	local	378b8233-d65d-4d8b-af6a-474e90d9c70b.mp4	CM spécial_spatial_court métrage 1 journée MNA Rosmerta - avignonais- karine(1080p).mp4	Cm Spécial Spatial Court Métrage 1 Journée Mna Rosmerta   Avignonais  Karine(1080p)	video/mp4	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 15:38:47.058+00	\N	2026-02-04 15:38:48.231+00	\N	292858313	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-02-04 15:38:48.229+00
08c609ee-463a-4777-929d-fecf3ed6cb9e	local	08c609ee-463a-4777-929d-fecf3ed6cb9e.mp4	docu mikette,_chimamanda_et_nous,_classe_de_seconde2 lycée rené char karine(1080p).mp4	Docu Mikette, Chimamanda Et Nous, Classe De Seconde2 Lycée René Char Karine(1080p)	video/mp4	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 15:41:42.183+00	\N	2026-02-04 15:41:44.458+00	\N	539174167	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-02-04 15:41:44.457+00
202c2c10-cc9b-4a6c-aca6-6221deb2a038	local	202c2c10-cc9b-4a6c-aca6-6221deb2a038.jpg	Complainte_1.jpg	Complainte 1	image/jpeg	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-03 15:49:16.029+00	\N	2026-02-03 15:49:16.054+00	\N	458119	1920	1080	\N	\N	\N	\N	\N	{}	\N	\N	\N	\N	2026-02-03 15:49:16.053+00
0a3eacd0-1db7-4673-8a24-06b5dec8555b	local	0a3eacd0-1db7-4673-8a24-06b5dec8555b.avif	Le_des_remparts.avif	Le Des Remparts	image/avif	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:08:13.057+00	\N	2026-02-04 08:08:13.071+00	\N	33176	1021	788	\N	\N	\N	\N	\N	{}	\N	\N	\N	\N	2026-02-04 08:08:13.071+00
188f5cbd-bec3-44ca-8fe9-f72252b92f0f	local	188f5cbd-bec3-44ca-8fe9-f72252b92f0f.png	12_mediation_Florine_Clap.png	12 Mediation Florine Clap	image/png	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:50:41.75+00	\N	2026-02-04 08:50:41.794+00	\N	3846563	3456	1948	\N	\N	\N	\N	\N	{}	\N	\N	\N	\N	2026-02-04 08:50:41.794+00
fb3738a6-3ac0-4443-843e-ee987f405c7a	local	fb3738a6-3ac0-4443-843e-ee987f405c7a.mp4	comment_j'ai_battu_le_record_du_tour_des_remparts_v1 (1080p).mp4	Comment J'ai Battu Le Record Du Tour Des Remparts V1 (1080p)	video/mp4	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:51:36.651+00	\N	2026-02-04 08:51:37.084+00	\N	90707543	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-02-04 08:51:37.083+00
37b77938-7168-4525-b6ba-58d2062bf267	local	37b77938-7168-4525-b6ba-58d2062bf267.mp4	Complainte de la lune.mp4	Complainte De La Lune	video/mp4	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:57:28.271+00	\N	2026-02-04 08:57:30.975+00	\N	686322535	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-02-04 08:57:30.971+00
b5866747-4647-4697-ac57-586f92e5aa2b	local	b5866747-4647-4697-ac57-586f92e5aa2b.JPG	MIKETTE, chimamanda et nous ETC.JPG	Mikette, Chimamanda Et Nous Etc	image/jpeg	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 13:10:00.323+00	\N	2026-02-04 13:10:00.339+00	\N	246825	1797	946	\N	\N	\N	\N	\N	{}	\N	\N	\N	\N	2026-02-04 13:10:00.339+00
74f06d27-9b78-4970-8382-e1f06eb8918b	local	74f06d27-9b78-4970-8382-e1f06eb8918b.jpg	special spatiale.jpg	Special Spatiale	image/jpeg	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 13:10:01.716+00	\N	2026-02-04 13:10:01.727+00	\N	649775	1920	1080	\N	\N	\N	\N	\N	{}	\N	\N	\N	\N	2026-02-04 13:10:01.726+00
f9ce4826-96b0-4bfd-a2e8-08dfd2e2d36b	local	f9ce4826-96b0-4bfd-a2e8-08dfd2e2d36b.png	cinepoeme.png	Cinepoeme	image/png	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 13:10:06.732+00	\N	2026-02-04 13:10:06.763+00	\N	3630306	2832	1204	\N	\N	\N	\N	\N	{}	\N	\N	\N	\N	2026-02-04 13:10:06.762+00
ec878bb7-2a34-4635-9c87-9ea528a35112	local	ec878bb7-2a34-4635-9c87-9ea528a35112.jpg	LIP DUB C pas la mer à boire.jpg	Lip Dub C Pas La Mer À Boire	image/jpeg	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 13:10:07.647+00	\N	2026-02-04 13:10:07.691+00	\N	5453868	3648	2736	\N	\N	\N	\N	\N	{"ifd0":{"Make":"HUAWEI","Model":"CLT-L29"},"exif":{"FNumber":4,"ExposureTime":0.000336,"FocalLength":5.58,"ISOSpeedRatings":50}}	\N	\N	\N	\N	2026-02-04 13:10:07.69+00
0a6a0f70-d167-4cb8-8a02-bb467b9f960c	local	0a6a0f70-d167-4cb8-8a02-bb467b9f960c.mp4	ciné poème nous,_poètes_du_monde..._voyageons_tel_ulis_dispo ULIS collehe ANselme Mathieu, Karine(1080p).mp4	Ciné Poème Nous, Poètes Du Monde... Voyageons Tel Ulis Dispo Ulis Collehe a Nselme Mathieu, Karine(1080p)	video/mp4	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 15:33:31.846+00	\N	2026-02-04 15:33:32.539+00	\N	149770613	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-02-04 15:33:32.536+00
5e14f07a-8783-4906-b175-76c6eaa42d6d	local	5e14f07a-8783-4906-b175-76c6eaa42d6d.mp4	lip_dub_-_avec_les_habitants_du_foyer_d'hébergement_-esat-_d'orange_1 journée (1080p)Karine.mp4	Lip Dub   Avec Les Habitants Du Foyer D'hébergement  Esat  D'orange 1 Journée (1080p)karine	video/mp4	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 15:36:37.02+00	\N	2026-02-04 15:36:38.034+00	\N	220005340	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2026-02-04 15:36:38.033+00
\.


--
-- Data for Name: directus_flows; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_flows (id, name, icon, color, description, status, trigger, accountability, options, operation, date_created, user_created) FROM stdin;
\.


--
-- Data for Name: directus_folders; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_folders (id, name, parent) FROM stdin;
\.


--
-- Data for Name: directus_migrations; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_migrations (version, name, "timestamp") FROM stdin;
20201028A	Remove Collection Foreign Keys	2026-02-03 10:12:03.596704+00
20201029A	Remove System Relations	2026-02-03 10:12:03.607051+00
20201029B	Remove System Collections	2026-02-03 10:12:03.613556+00
20201029C	Remove System Fields	2026-02-03 10:12:03.628975+00
20201105A	Add Cascade System Relations	2026-02-03 10:12:03.693894+00
20201105B	Change Webhook URL Type	2026-02-03 10:12:03.702683+00
20210225A	Add Relations Sort Field	2026-02-03 10:12:03.71104+00
20210304A	Remove Locked Fields	2026-02-03 10:12:03.714947+00
20210312A	Webhooks Collections Text	2026-02-03 10:12:03.721992+00
20210331A	Add Refresh Interval	2026-02-03 10:12:03.724806+00
20210415A	Make Filesize Nullable	2026-02-03 10:12:03.734815+00
20210416A	Add Collections Accountability	2026-02-03 10:12:03.739925+00
20210422A	Remove Files Interface	2026-02-03 10:12:03.742373+00
20210506A	Rename Interfaces	2026-02-03 10:12:03.767031+00
20210510A	Restructure Relations	2026-02-03 10:12:03.782222+00
20210518A	Add Foreign Key Constraints	2026-02-03 10:12:03.793683+00
20210519A	Add System Fk Triggers	2026-02-03 10:12:03.837228+00
20210521A	Add Collections Icon Color	2026-02-03 10:12:03.84017+00
20210525A	Add Insights	2026-02-03 10:12:03.865792+00
20210608A	Add Deep Clone Config	2026-02-03 10:12:03.869499+00
20210626A	Change Filesize Bigint	2026-02-03 10:12:03.885389+00
20210716A	Add Conditions to Fields	2026-02-03 10:12:03.888629+00
20210721A	Add Default Folder	2026-02-03 10:12:03.896035+00
20210802A	Replace Groups	2026-02-03 10:12:03.901125+00
20210803A	Add Required to Fields	2026-02-03 10:12:03.903855+00
20210805A	Update Groups	2026-02-03 10:12:03.907943+00
20210805B	Change Image Metadata Structure	2026-02-03 10:12:03.9121+00
20210811A	Add Geometry Config	2026-02-03 10:12:03.914897+00
20210831A	Remove Limit Column	2026-02-03 10:12:03.917413+00
20210903A	Add Auth Provider	2026-02-03 10:12:03.932889+00
20210907A	Webhooks Collections Not Null	2026-02-03 10:12:03.939668+00
20210910A	Move Module Setup	2026-02-03 10:12:03.943336+00
20210920A	Webhooks URL Not Null	2026-02-03 10:12:03.949706+00
20210924A	Add Collection Organization	2026-02-03 10:12:03.957504+00
20210927A	Replace Fields Group	2026-02-03 10:12:03.967564+00
20210927B	Replace M2M Interface	2026-02-03 10:12:03.96992+00
20210929A	Rename Login Action	2026-02-03 10:12:03.971974+00
20211007A	Update Presets	2026-02-03 10:12:03.97849+00
20211009A	Add Auth Data	2026-02-03 10:12:03.980891+00
20211016A	Add Webhook Headers	2026-02-03 10:12:03.983168+00
20211103A	Set Unique to User Token	2026-02-03 10:12:03.987933+00
20211103B	Update Special Geometry	2026-02-03 10:12:03.990667+00
20211104A	Remove Collections Listing	2026-02-03 10:12:03.994568+00
20211118A	Add Notifications	2026-02-03 10:12:04.012512+00
20211211A	Add Shares	2026-02-03 10:12:04.035438+00
20211230A	Add Project Descriptor	2026-02-03 10:12:04.038734+00
20220303A	Remove Default Project Color	2026-02-03 10:12:04.04667+00
20220308A	Add Bookmark Icon and Color	2026-02-03 10:12:04.050172+00
20220314A	Add Translation Strings	2026-02-03 10:12:04.052752+00
20220322A	Rename Field Typecast Flags	2026-02-03 10:12:04.058166+00
20220323A	Add Field Validation	2026-02-03 10:12:04.060832+00
20220325A	Fix Typecast Flags	2026-02-03 10:12:04.06564+00
20220325B	Add Default Language	2026-02-03 10:12:04.075909+00
20220402A	Remove Default Value Panel Icon	2026-02-03 10:12:04.086543+00
20220429A	Add Flows	2026-02-03 10:12:04.124059+00
20220429B	Add Color to Insights Icon	2026-02-03 10:12:04.127048+00
20220429C	Drop Non Null From IP of Activity	2026-02-03 10:12:04.129278+00
20220429D	Drop Non Null From Sender of Notifications	2026-02-03 10:12:04.131429+00
20220614A	Rename Hook Trigger to Event	2026-02-03 10:12:04.133573+00
20220801A	Update Notifications Timestamp Column	2026-02-03 10:12:04.140695+00
20220802A	Add Custom Aspect Ratios	2026-02-03 10:12:04.143377+00
20220826A	Add Origin to Accountability	2026-02-03 10:12:04.147199+00
20230401A	Update Material Icons	2026-02-03 10:12:04.156293+00
20230525A	Add Preview Settings	2026-02-03 10:12:04.159191+00
20230526A	Migrate Translation Strings	2026-02-03 10:12:04.169556+00
20230721A	Require Shares Fields	2026-02-03 10:12:04.175519+00
20230823A	Add Content Versioning	2026-02-03 10:12:04.203474+00
20230927A	Themes	2026-02-03 10:12:04.223194+00
20231009A	Update CSV Fields to Text	2026-02-03 10:12:04.229286+00
20231009B	Update Panel Options	2026-02-03 10:12:04.232052+00
20231010A	Add Extensions	2026-02-03 10:12:04.238178+00
20231215A	Add Focalpoints	2026-02-03 10:12:04.240777+00
20240122A	Add Report URL Fields	2026-02-03 10:12:04.243522+00
20240204A	Marketplace	2026-02-03 10:12:04.268251+00
20240305A	Change Useragent Type	2026-02-03 10:12:04.277467+00
20240311A	Deprecate Webhooks	2026-02-03 10:12:04.288095+00
20240422A	Public Registration	2026-02-03 10:12:04.297108+00
20240515A	Add Session Window	2026-02-03 10:12:04.300021+00
20240701A	Add Tus Data	2026-02-03 10:12:04.302762+00
20240716A	Update Files Date Fields	2026-02-03 10:12:04.309728+00
20240806A	Permissions Policies	2026-02-03 10:12:04.361585+00
20240817A	Update Icon Fields Length	2026-02-03 10:12:04.385111+00
20240909A	Separate Comments	2026-02-03 10:12:04.401045+00
20240909B	Consolidate Content Versioning	2026-02-03 10:12:04.403784+00
20240924A	Migrate Legacy Comments	2026-02-03 10:12:04.409383+00
20240924B	Populate Versioning Deltas	2026-02-03 10:12:04.413952+00
20250224A	Visual Editor	2026-02-03 10:12:04.417432+00
20250609A	License Banner	2026-02-03 10:12:04.422547+00
20250613A	Add Project ID	2026-02-03 10:12:04.437432+00
20250718A	Add Direction	2026-02-03 10:12:04.440661+00
20250813A	Add MCP	2026-02-03 10:12:04.44655+00
20251012A	Add Field Searchable	2026-02-03 10:12:04.449954+00
20251014A	Add Project Owner	2026-02-03 10:12:04.51343+00
20251028A	Add Retention Indexes	2026-02-03 10:12:04.578992+00
20251103A	Add AI Settings	2026-02-03 10:12:04.583347+00
20251224A	Remove Webhooks	2026-02-03 10:12:04.59313+00
20260113A	Add Revisions Index	2026-02-03 10:12:04.616299+00
\.


--
-- Data for Name: directus_notifications; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_notifications (id, "timestamp", status, recipient, sender, subject, message, collection, item) FROM stdin;
\.


--
-- Data for Name: directus_operations; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_operations (id, name, key, type, position_x, position_y, options, resolve, reject, flow, date_created, user_created) FROM stdin;
\.


--
-- Data for Name: directus_panels; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_panels (id, dashboard, name, icon, color, show_header, note, type, position_x, position_y, width, height, options, date_created, user_created) FROM stdin;
\.


--
-- Data for Name: directus_permissions; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_permissions (id, collection, action, permissions, validation, presets, fields, policy) FROM stdin;
1	actualites	read	\N	\N	\N	*	abf8a154-5b1c-4a46-ac9c-7300570f4f17
2	home_settings	read	\N	\N	\N	*	abf8a154-5b1c-4a46-ac9c-7300570f4f17
3	home_settings_files	read	\N	\N	\N	*	abf8a154-5b1c-4a46-ac9c-7300570f4f17
4	mediations	read	\N	\N	\N	*	abf8a154-5b1c-4a46-ac9c-7300570f4f17
5	directus_files	read	\N	\N	\N	*	abf8a154-5b1c-4a46-ac9c-7300570f4f17
6	directus_folders	read	\N	\N	\N	*	abf8a154-5b1c-4a46-ac9c-7300570f4f17
\.


--
-- Data for Name: directus_policies; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_policies (id, name, icon, description, ip_access, enforce_tfa, admin_access, app_access) FROM stdin;
abf8a154-5b1c-4a46-ac9c-7300570f4f17	$t:public_label	public	$t:public_description	\N	f	f	f
72a1aa8f-b28d-4b84-bc7d-5ec2db1cc3d4	Administrator	verified	$t:admin_description	\N	f	t	t
\.


--
-- Data for Name: directus_presets; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_presets (id, bookmark, "user", role, collection, search, layout, layout_query, layout_options, refresh_interval, filter, icon, color) FROM stdin;
1	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	\N	directus_files	\N	cards	{"cards":{"sort":["-uploaded_on"],"page":1}}	{"cards":{"icon":"insert_drive_file","title":"{{ title }}","subtitle":"{{ type }} • {{ filesize }}","size":4,"imageFit":"crop"}}	\N	\N	bookmark	\N
2	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	\N	directus_files	\N	cards	{"cards":{"sort":["-uploaded_on"],"page":1}}	{"cards":{"icon":"insert_drive_file","title":"{{ title }}","subtitle":"{{ type }} • {{ filesize }}","size":4,"imageFit":"crop"}}	\N	\N	bookmark	\N
3	\N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	\N	mediations	\N	\N	{"tabular":{"fields":["titre","date","sous_titre"]}}	{"tabular":{"widths":{"titre":347.3359375,"date":160,"slug":160,"sous_titre":160}}}	\N	\N	bookmark	\N
\.


--
-- Data for Name: directus_relations; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_relations (id, many_collection, many_field, one_collection, one_field, one_collection_field, one_allowed_collections, junction_field, sort_field, one_deselect_action) FROM stdin;
1	home_settings_files	home_settings_id	home_settings	hero_images	\N	\N	directus_files_id	sort	delete
2	home_settings_files	directus_files_id	directus_files	\N	\N	\N	home_settings_id	sort	delete
3	mediations	image	directus_files	\N	\N	\N	\N	\N	nullify
4	mediations	video	directus_files	\N	\N	\N	\N	\N	nullify
5	actualites	image	directus_files	\N	\N	\N	\N	\N	nullify
\.


--
-- Data for Name: directus_revisions; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_revisions (id, activity, collection, item, data, delta, parent, version) FROM stdin;
1	5	directus_fields	1	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"mediations"}	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"mediations"}	\N	\N
2	6	directus_collections	mediations	{"icon":"video_library","note":"Médiations (anciens projets Decap CMS)","collection":"mediations"}	{"icon":"video_library","note":"Médiations (anciens projets Decap CMS)","collection":"mediations"}	\N	\N
3	7	directus_fields	2	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"actualites"}	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"actualites"}	\N	\N
4	8	directus_collections	actualites	{"icon":"feed","note":"Actualités (Decap CMS)","collection":"actualites"}	{"icon":"feed","note":"Actualités (Decap CMS)","collection":"actualites"}	\N	\N
5	9	directus_fields	3	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"home_settings"}	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"home_settings"}	\N	\N
6	10	directus_collections	home_settings	{"icon":"home","singleton":true,"note":"Paramètres de la page d’accueil","collection":"home_settings"}	{"icon":"home","singleton":true,"note":"Paramètres de la page d’accueil","collection":"home_settings"}	\N	\N
7	11	directus_fields	4	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"home_settings_files"}	{"sort":1,"hidden":true,"interface":"numeric","readonly":true,"field":"id","collection":"home_settings_files"}	\N	\N
8	12	directus_collections	home_settings_files	{"icon":"collections","hidden":true,"note":"Junction home_settings <-> directus_files","collection":"home_settings_files"}	{"icon":"collections","hidden":true,"note":"Junction home_settings <-> directus_files","collection":"home_settings_files"}	\N	\N
9	13	directus_fields	5	{"sort":2,"interface":"input","collection":"home_settings_files","field":"home_settings_id"}	{"sort":2,"interface":"input","collection":"home_settings_files","field":"home_settings_id"}	\N	\N
10	14	directus_fields	6	{"sort":3,"interface":"input","collection":"home_settings_files","field":"directus_files_id"}	{"sort":3,"interface":"input","collection":"home_settings_files","field":"directus_files_id"}	\N	\N
11	15	directus_fields	7	{"sort":4,"interface":"input","collection":"home_settings_files","field":"sort"}	{"sort":4,"interface":"input","collection":"home_settings_files","field":"sort"}	\N	\N
12	16	directus_fields	8	{"sort":2,"interface":"input","required":true,"collection":"mediations","field":"slug"}	{"sort":2,"interface":"input","required":true,"collection":"mediations","field":"slug"}	\N	\N
13	17	directus_fields	9	{"sort":3,"interface":"input","required":true,"collection":"mediations","field":"titre"}	{"sort":3,"interface":"input","required":true,"collection":"mediations","field":"titre"}	\N	\N
14	18	directus_fields	10	{"sort":4,"interface":"input","collection":"mediations","field":"sous_titre"}	{"sort":4,"interface":"input","collection":"mediations","field":"sous_titre"}	\N	\N
15	19	directus_fields	11	{"sort":5,"interface":"datetime","collection":"mediations","field":"date"}	{"sort":5,"interface":"datetime","collection":"mediations","field":"date"}	\N	\N
16	20	directus_fields	12	{"sort":6,"interface":"input-rich-text-md","collection":"mediations","field":"body"}	{"sort":6,"interface":"input-rich-text-md","collection":"mediations","field":"body"}	\N	\N
17	21	directus_fields	13	{"sort":7,"interface":"file-image","special":["file"],"collection":"mediations","field":"image"}	{"sort":7,"interface":"file-image","special":["file"],"collection":"mediations","field":"image"}	\N	\N
18	22	directus_fields	14	{"sort":8,"interface":"file","special":["file"],"collection":"mediations","field":"video"}	{"sort":8,"interface":"file","special":["file"],"collection":"mediations","field":"video"}	\N	\N
19	23	directus_fields	15	{"sort":9,"interface":"input","collection":"mediations","field":"categorie"}	{"sort":9,"interface":"input","collection":"mediations","field":"categorie"}	\N	\N
20	24	directus_fields	16	{"sort":2,"interface":"input","required":true,"collection":"actualites","field":"slug"}	{"sort":2,"interface":"input","required":true,"collection":"actualites","field":"slug"}	\N	\N
21	25	directus_fields	17	{"sort":3,"interface":"input","required":true,"collection":"actualites","field":"titre"}	{"sort":3,"interface":"input","required":true,"collection":"actualites","field":"titre"}	\N	\N
22	26	directus_fields	18	{"sort":4,"interface":"input","collection":"actualites","field":"sous_titre"}	{"sort":4,"interface":"input","collection":"actualites","field":"sous_titre"}	\N	\N
23	27	directus_fields	19	{"sort":5,"interface":"datetime","collection":"actualites","field":"date"}	{"sort":5,"interface":"datetime","collection":"actualites","field":"date"}	\N	\N
24	28	directus_fields	20	{"sort":6,"interface":"input-rich-text-md","collection":"actualites","field":"body"}	{"sort":6,"interface":"input-rich-text-md","collection":"actualites","field":"body"}	\N	\N
25	29	directus_fields	21	{"sort":7,"interface":"file-image","special":["file"],"collection":"actualites","field":"image"}	{"sort":7,"interface":"file-image","special":["file"],"collection":"actualites","field":"image"}	\N	\N
26	30	directus_fields	22	{"sort":8,"interface":"input","collection":"actualites","field":"categorie"}	{"sort":8,"interface":"input","collection":"actualites","field":"categorie"}	\N	\N
27	31	directus_fields	23	{"sort":2,"interface":"files","special":["m2m"],"options":{"limit":10},"collection":"home_settings","field":"hero_images"}	{"sort":2,"interface":"files","special":["m2m"],"options":{"limit":10},"collection":"home_settings","field":"hero_images"}	\N	\N
28	32	directus_collections	home_settings	{"collection":"home_settings","icon":"home","note":"Paramètres de la page d’accueil","display_template":null,"hidden":false,"singleton":true,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":1,"group":null,"collapse":"open","preview_url":null,"versioning":false}	{"sort":1,"group":null}	\N	\N
29	33	directus_collections	actualites	{"collection":"actualites","icon":"feed","note":"Actualités (Decap CMS)","display_template":null,"hidden":false,"singleton":false,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":2,"group":null,"collapse":"open","preview_url":null,"versioning":false}	{"sort":2,"group":null}	\N	\N
76	93	directus_files	188f5cbd-bec3-44ca-8fe9-f72252b92f0f	{"title":"12 Mediation Florine Clap","filename_download":"12_mediation_Florine_Clap.png","type":"image/png","storage":"local"}	{"title":"12 Mediation Florine Clap","filename_download":"12_mediation_Florine_Clap.png","type":"image/png","storage":"local"}	\N	\N
30	34	directus_collections	home_settings_files	{"collection":"home_settings_files","icon":"collections","note":"Junction home_settings <-> directus_files","display_template":null,"hidden":true,"singleton":false,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":3,"group":null,"collapse":"open","preview_url":null,"versioning":false}	{"sort":3,"group":null}	\N	\N
31	35	directus_collections	mediations	{"collection":"mediations","icon":"video_library","note":"Médiations (anciens projets Decap CMS)","display_template":null,"hidden":false,"singleton":false,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":4,"group":null,"collapse":"open","preview_url":null,"versioning":false}	{"sort":4,"group":null}	\N	\N
32	36	directus_collections	home_settings	{"collection":"home_settings","icon":"home","note":"Paramètres de la page d’accueil","display_template":null,"hidden":false,"singleton":true,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":1,"group":null,"collapse":"open","preview_url":null,"versioning":false}	{"sort":1,"group":null}	\N	\N
33	37	directus_collections	mediations	{"collection":"mediations","icon":"video_library","note":"Médiations (anciens projets Decap CMS)","display_template":null,"hidden":false,"singleton":false,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":2,"group":null,"collapse":"open","preview_url":null,"versioning":false}	{"sort":2,"group":null}	\N	\N
34	38	directus_collections	actualites	{"collection":"actualites","icon":"feed","note":"Actualités (Decap CMS)","display_template":null,"hidden":false,"singleton":false,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":3,"group":null,"collapse":"open","preview_url":null,"versioning":false}	{"sort":3,"group":null}	\N	\N
35	39	directus_collections	home_settings_files	{"collection":"home_settings_files","icon":"collections","note":"Junction home_settings <-> directus_files","display_template":null,"hidden":true,"singleton":false,"translations":null,"archive_field":null,"archive_app_filter":true,"archive_value":null,"unarchive_value":null,"sort_field":null,"accountability":"all","color":null,"item_duplication_fields":null,"sort":4,"group":null,"collapse":"open","preview_url":null,"versioning":false}	{"sort":4,"group":null}	\N	\N
36	40	directus_permissions	1	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","permissions":null,"validation":null,"fields":["*"],"presets":null,"collection":"actualites","action":"read"}	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","permissions":null,"validation":null,"fields":["*"],"presets":null,"collection":"actualites","action":"read"}	\N	\N
37	41	directus_permissions	2	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","permissions":null,"validation":null,"fields":["*"],"presets":null,"collection":"home_settings","action":"read"}	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","permissions":null,"validation":null,"fields":["*"],"presets":null,"collection":"home_settings","action":"read"}	\N	\N
38	42	directus_permissions	3	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","permissions":null,"validation":null,"fields":["*"],"presets":null,"collection":"home_settings_files","action":"read"}	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","permissions":null,"validation":null,"fields":["*"],"presets":null,"collection":"home_settings_files","action":"read"}	\N	\N
39	43	directus_permissions	4	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","permissions":null,"validation":null,"fields":["*"],"presets":null,"collection":"mediations","action":"read"}	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","permissions":null,"validation":null,"fields":["*"],"presets":null,"collection":"mediations","action":"read"}	\N	\N
40	45	mediations	1	{"titre":"Test","slug":"test","sous_titre":"sous test","date":"2026-02-03T12:12:00","body":"body test"}	{"titre":"Test","slug":"test","sous_titre":"sous test","date":"2026-02-03T12:12:00","body":"body test"}	\N	\N
41	46	directus_files	83e578ce-24e3-4128-b475-f45d16f7dd13	{"title":"1101f4bad73aa38f965db9083f775d4d7956db06 944","filename_download":"1101f4bad73aa38f965db9083f775d4d7956db06_944.jpg","type":"image/jpeg","storage":"local"}	{"title":"1101f4bad73aa38f965db9083f775d4d7956db06 944","filename_download":"1101f4bad73aa38f965db9083f775d4d7956db06_944.jpg","type":"image/jpeg","storage":"local"}	\N	\N
42	48	directus_files	e3d41498-3e27-4b5e-a586-d8e74932683d	{"title":"1101f4bad73aa38f965db9083f775d4d7956db06 944","filename_download":"1101f4bad73aa38f965db9083f775d4d7956db06_944.jpg","type":"image/jpeg","storage":"local"}	{"title":"1101f4bad73aa38f965db9083f775d4d7956db06 944","filename_download":"1101f4bad73aa38f965db9083f775d4d7956db06_944.jpg","type":"image/jpeg","storage":"local"}	\N	\N
43	49	mediations	1	{"id":1,"slug":"test","titre":"Test","sous_titre":"sous test","date":"2026-02-03T12:12:00","body":"body test","image":"e3d41498-3e27-4b5e-a586-d8e74932683d","video":null,"categorie":null}	{"image":"e3d41498-3e27-4b5e-a586-d8e74932683d"}	\N	\N
44	50	directus_permissions	5	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","permissions":null,"validation":null,"fields":["*"],"presets":null,"collection":"directus_files","action":"read"}	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","permissions":null,"validation":null,"fields":["*"],"presets":null,"collection":"directus_files","action":"read"}	\N	\N
45	51	directus_permissions	6	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","permissions":null,"validation":null,"fields":["*"],"presets":null,"collection":"directus_folders","action":"read"}	{"policy":"abf8a154-5b1c-4a46-ac9c-7300570f4f17","permissions":null,"validation":null,"fields":["*"],"presets":null,"collection":"directus_folders","action":"read"}	\N	\N
46	54	directus_files	27b10691-75cd-48e5-bab4-52bb3dfd7093	{"title":"5v17xwvwj2hg1","filename_download":"5v17xwvwj2hg1.jpeg","type":"image/jpeg","storage":"local"}	{"title":"5v17xwvwj2hg1","filename_download":"5v17xwvwj2hg1.jpeg","type":"image/jpeg","storage":"local"}	\N	\N
47	55	actualites	1	{"slug":"test","titre":"test","sous_titre":"sous test","date":"2026-02-03T12:39:00","body":"body test","image":"27b10691-75cd-48e5-bab4-52bb3dfd7093"}	{"slug":"test","titre":"test","sous_titre":"sous test","date":"2026-02-03T12:39:00","body":"body test","image":"27b10691-75cd-48e5-bab4-52bb3dfd7093"}	\N	\N
77	94	directus_files	fb3738a6-3ac0-4443-843e-ee987f405c7a	{"title":"Comment J'ai Battu Le Record Du Tour Des Remparts V1 (1080p)","filename_download":"comment_j'ai_battu_le_record_du_tour_des_remparts_v1 (1080p).mp4","type":"video/mp4","storage":"local"}	{"title":"Comment J'ai Battu Le Record Du Tour Des Remparts V1 (1080p)","filename_download":"comment_j'ai_battu_le_record_du_tour_des_remparts_v1 (1080p).mp4","type":"video/mp4","storage":"local"}	\N	\N
48	63	directus_settings	1	{"id":1,"project_name":"Directus","project_url":null,"project_color":"#6644FF","project_logo":null,"public_foreground":null,"public_background":null,"public_note":null,"auth_login_attempts":25,"auth_password_policy":null,"storage_asset_transform":"all","storage_asset_presets":null,"custom_css":null,"storage_default_folder":null,"basemaps":null,"mapbox_key":null,"module_bar":null,"project_descriptor":null,"default_language":"en-US","custom_aspect_ratios":null,"public_favicon":null,"default_appearance":"auto","default_theme_light":null,"theme_light_overrides":null,"default_theme_dark":null,"theme_dark_overrides":null,"report_error_url":null,"report_bug_url":null,"report_feature_url":null,"public_registration":false,"public_registration_verify_email":true,"public_registration_role":null,"public_registration_email_filter":null,"visual_editor_urls":null,"project_id":"019c22fc-e2d3-74ad-8d0c-7cf891f25a3a","mcp_enabled":false,"mcp_allow_deletes":false,"mcp_prompts_collection":null,"mcp_system_prompt_enabled":true,"mcp_system_prompt":null,"project_owner":"takcastel@gmail.com","project_usage":"commercial","org_name":"123Soleil","product_updates":true,"project_status":null,"ai_openai_api_key":null,"ai_anthropic_api_key":null,"ai_system_prompt":null}	{"project_owner":"takcastel@gmail.com","project_usage":"commercial","org_name":"123Soleil","product_updates":true,"project_status":null}	\N	\N
49	64	directus_files	202c2c10-cc9b-4a6c-aca6-6221deb2a038	{"title":"Complainte 1","filename_download":"Complainte_1.jpg","type":"image/jpeg","storage":"local"}	{"title":"Complainte 1","filename_download":"Complainte_1.jpg","type":"image/jpeg","storage":"local"}	\N	\N
50	65	mediations	2	{"titre":"Complainte de la Lune","body":"Un conte écologique, adapté du conte Le joueur de flûte de Hamelin \\nD’après les Frères Grimm\\n","slug":"complainte-de-la-lune","image":"202c2c10-cc9b-4a6c-aca6-6221deb2a038"}	{"titre":"Complainte de la Lune","body":"Un conte écologique, adapté du conte Le joueur de flûte de Hamelin \\nD’après les Frères Grimm\\n","slug":"complainte-de-la-lune","image":"202c2c10-cc9b-4a6c-aca6-6221deb2a038"}	\N	\N
51	66	mediations	2	{"id":2,"slug":"complainte-de-la-lune","titre":"Complainte de la Lune","sous_titre":null,"date":"2023-11-19T12:00:00","body":"Un conte écologique, adapté du conte Le joueur de flûte de Hamelin \\nD’après les Frères Grimm\\n","image":"202c2c10-cc9b-4a6c-aca6-6221deb2a038","video":null,"categorie":null}	{"date":"2023-11-19T12:00:00"}	\N	\N
52	67	mediations	2	{"id":2,"slug":"complainte-de-la-lune","titre":"Complainte de la Lune","sous_titre":null,"date":"2023-11-19T12:00:00","body":"Un conte écologique, adapté du conte Le joueur de flûte de Hamelin \\nD’après les Frères Grimm\\n","image":"202c2c10-cc9b-4a6c-aca6-6221deb2a038","video":null,"categorie":"Court-métrage"}	{"categorie":"Court-métrage"}	\N	\N
53	68	mediations	2	{"id":2,"slug":"complainte-de-la-lune","titre":"Complainte de la Lune","sous_titre":null,"date":"2023-11-19T12:00:00","body":"Un conte écologique, adapté du conte Le joueur de flûte de Hamelin \\nD’après les Frères Grimm\\n","image":"202c2c10-cc9b-4a6c-aca6-6221deb2a038","video":null,"categorie":"Courts métrages"}	{"categorie":"Courts métrages"}	\N	\N
54	69	mediations	2	{"id":2,"slug":"complainte-de-la-lune","titre":"Complainte de la Lune","sous_titre":null,"date":"2023-11-19T12:00:00","body":"Un conte écologique, adapté du conte Le joueur de flûte de Hamelin \\nD’après les Frères Grimm\\n","image":"202c2c10-cc9b-4a6c-aca6-6221deb2a038","video":null,"categorie":"courts-metrages"}	{"categorie":"courts-metrages"}	\N	\N
55	70	directus_fields	15	{"id":15,"collection":"mediations","field":"categorie","special":null,"interface":"select-dropdown","options":{"choices":[{"text":"Courts-métrages","value":"court-metrages"}]},"display":null,"display_options":null,"readonly":false,"hidden":false,"sort":9,"width":"full","translations":null,"note":null,"conditions":null,"required":false,"group":null,"validation":null,"validation_message":null,"searchable":true}	{"collection":"mediations","field":"categorie","interface":"select-dropdown","options":{"choices":[{"text":"Courts-métrages","value":"court-metrages"}]}}	\N	\N
56	71	mediations	2	{"id":2,"slug":"complainte-de-la-lune","titre":"Complainte de la Lune","sous_titre":null,"date":"2023-11-19T12:00:00","body":"Un conte écologique, adapté du conte Le joueur de flûte de Hamelin \\nD’après les Frères Grimm\\n","image":"202c2c10-cc9b-4a6c-aca6-6221deb2a038","video":null,"categorie":"court-metrages"}	{"categorie":"court-metrages"}	\N	\N
57	72	directus_settings	1	{"id":1,"project_name":"Directus","project_url":null,"project_color":"#FFC23B","project_logo":null,"public_foreground":null,"public_background":null,"public_note":null,"auth_login_attempts":25,"auth_password_policy":null,"storage_asset_transform":"all","storage_asset_presets":null,"custom_css":null,"storage_default_folder":null,"basemaps":null,"mapbox_key":null,"module_bar":null,"project_descriptor":null,"default_language":"en-US","custom_aspect_ratios":null,"public_favicon":null,"default_appearance":"auto","default_theme_light":null,"theme_light_overrides":null,"default_theme_dark":null,"theme_dark_overrides":null,"report_error_url":null,"report_bug_url":null,"report_feature_url":null,"public_registration":false,"public_registration_verify_email":true,"public_registration_role":null,"public_registration_email_filter":null,"visual_editor_urls":null,"project_id":"019c22fc-e2d3-74ad-8d0c-7cf891f25a3a","mcp_enabled":false,"mcp_allow_deletes":false,"mcp_prompts_collection":null,"mcp_system_prompt_enabled":true,"mcp_system_prompt":null,"project_owner":"takcastel@gmail.com","project_usage":"commercial","org_name":"123Soleil","product_updates":true,"project_status":null,"ai_openai_api_key":null,"ai_anthropic_api_key":null,"ai_system_prompt":null}	{"project_color":"#FFC23B"}	\N	\N
58	73	directus_settings	1	{"id":1,"project_name":"Directus","project_url":null,"project_color":"#FFC23B","project_logo":null,"public_foreground":null,"public_background":null,"public_note":null,"auth_login_attempts":25,"auth_password_policy":null,"storage_asset_transform":"all","storage_asset_presets":null,"custom_css":null,"storage_default_folder":null,"basemaps":null,"mapbox_key":null,"module_bar":null,"project_descriptor":null,"default_language":"en-US","custom_aspect_ratios":null,"public_favicon":null,"default_appearance":"auto","default_theme_light":"Directus Color Match","theme_light_overrides":null,"default_theme_dark":null,"theme_dark_overrides":null,"report_error_url":null,"report_bug_url":null,"report_feature_url":null,"public_registration":false,"public_registration_verify_email":true,"public_registration_role":null,"public_registration_email_filter":null,"visual_editor_urls":null,"project_id":"019c22fc-e2d3-74ad-8d0c-7cf891f25a3a","mcp_enabled":false,"mcp_allow_deletes":false,"mcp_prompts_collection":null,"mcp_system_prompt_enabled":true,"mcp_system_prompt":null,"project_owner":"takcastel@gmail.com","project_usage":"commercial","org_name":"123Soleil","product_updates":true,"project_status":null,"ai_openai_api_key":null,"ai_anthropic_api_key":null,"ai_system_prompt":null}	{"default_theme_light":"Directus Color Match"}	\N	\N
59	74	directus_settings	1	{"id":1,"project_name":"Directus","project_url":null,"project_color":"#FFC23B","project_logo":null,"public_foreground":null,"public_background":null,"public_note":null,"auth_login_attempts":25,"auth_password_policy":null,"storage_asset_transform":"all","storage_asset_presets":null,"custom_css":null,"storage_default_folder":null,"basemaps":null,"mapbox_key":null,"module_bar":null,"project_descriptor":null,"default_language":"en-US","custom_aspect_ratios":null,"public_favicon":null,"default_appearance":"auto","default_theme_light":"Directus Default","theme_light_overrides":null,"default_theme_dark":null,"theme_dark_overrides":null,"report_error_url":null,"report_bug_url":null,"report_feature_url":null,"public_registration":false,"public_registration_verify_email":true,"public_registration_role":null,"public_registration_email_filter":null,"visual_editor_urls":null,"project_id":"019c22fc-e2d3-74ad-8d0c-7cf891f25a3a","mcp_enabled":false,"mcp_allow_deletes":false,"mcp_prompts_collection":null,"mcp_system_prompt_enabled":true,"mcp_system_prompt":null,"project_owner":"takcastel@gmail.com","project_usage":"commercial","org_name":"123Soleil","product_updates":true,"project_status":null,"ai_openai_api_key":null,"ai_anthropic_api_key":null,"ai_system_prompt":null}	{"default_theme_light":"Directus Default"}	\N	\N
60	75	mediations	3	{"titre":"Comment j'ai battu le tour des remparts","slug":"comment-j-ai-battu-le-tour-des-remparts","body":"Des copains se lancent un défi : faire le tour des remparts le plus vite possible. \\nUn atelier encadré par Florine Clap et José Joilan. \\nAvignon 2018\\n"}	{"titre":"Comment j'ai battu le tour des remparts","slug":"comment-j-ai-battu-le-tour-des-remparts","body":"Des copains se lancent un défi : faire le tour des remparts le plus vite possible. \\nUn atelier encadré par Florine Clap et José Joilan. \\nAvignon 2018\\n"}	\N	\N
61	76	mediations	3	{"id":3,"slug":"comment-j-ai-battu-le-record-du-tour-des-remparts","titre":"Comment j'ai battu le record du tour des remparts","sous_titre":null,"date":null,"body":"Des copains se lancent un défi : faire le tour des remparts le plus vite possible. \\nUn atelier encadré par Florine Clap et José Joilan. \\nAvignon 2018\\n","image":null,"video":null,"categorie":null}	{"slug":"comment-j-ai-battu-le-record-du-tour-des-remparts","titre":"Comment j'ai battu le record du tour des remparts"}	\N	\N
62	77	directus_files	0a3eacd0-1db7-4673-8a24-06b5dec8555b	{"title":"Le Des Remparts","filename_download":"Le_des_remparts.avif","type":"image/avif","storage":"local"}	{"title":"Le Des Remparts","filename_download":"Le_des_remparts.avif","type":"image/avif","storage":"local"}	\N	\N
63	78	mediations	3	{"id":3,"slug":"comment-j-ai-battu-le-record-du-tour-des-remparts","titre":"Comment j'ai battu le record du tour des remparts","sous_titre":null,"date":null,"body":"Des copains se lancent un défi : faire le tour des remparts le plus vite possible. \\nUn atelier encadré par Florine Clap et José Joilan. \\nAvignon 2018\\n","image":"0a3eacd0-1db7-4673-8a24-06b5dec8555b","video":null,"categorie":"court-metrages"}	{"image":"0a3eacd0-1db7-4673-8a24-06b5dec8555b","categorie":"court-metrages"}	\N	\N
64	79	mediations	2	{"id":2,"slug":"la-complainte-de-la-lune","titre":"La Complainte de la Lune","sous_titre":null,"date":"2023-11-19T12:00:00","body":"Un conte écologique, adapté du conte Le joueur de flûte de Hamelin \\nD’après les Frères Grimm\\nUn atelier encadré par Florine Clap et Brice Theate.\\n","image":"202c2c10-cc9b-4a6c-aca6-6221deb2a038","video":null,"categorie":"court-metrages"}	{"slug":"la-complainte-de-la-lune","titre":"La Complainte de la Lune","body":"Un conte écologique, adapté du conte Le joueur de flûte de Hamelin \\nD’après les Frères Grimm\\nUn atelier encadré par Florine Clap et Brice Theate.\\n"}	\N	\N
65	80	mediations	4	{"titre":"Raconte-moi ton école ","body":"Une médiation proposé par Florine Clap et Nans Pierson. \\n\\nCe dispositif invite les adolescent·es à choisir un espace de leur IME (Institut médico-éducatif), un morceau de musique, et à investir le lieu choisi en y dansant. Sous forme de portraits vidéo, ces ados nous font visiter leur lieu de vie et d'apprentissage en dansant. Ce dispositif ouvre ainsi tout un champ d'expression corporelle et intime devant la caméra.","slug":"raconte-moi-ton-ecole"}	{"titre":"Raconte-moi ton école ","body":"Une médiation proposé par Florine Clap et Nans Pierson. \\n\\nCe dispositif invite les adolescent·es à choisir un espace de leur IME (Institut médico-éducatif), un morceau de musique, et à investir le lieu choisi en y dansant. Sous forme de portraits vidéo, ces ados nous font visiter leur lieu de vie et d'apprentissage en dansant. Ce dispositif ouvre ainsi tout un champ d'expression corporelle et intime devant la caméra.","slug":"raconte-moi-ton-ecole"}	\N	\N
66	81	mediations	5	{"titre":"Ciné-poèmes","body":"Ciné-poèmes avec le dispositif ULIS du collège Anselme Mathieu\\n« Nous, poètes du monde… voyageons tel ULIS » propose une immersion poétique avec les jeunes du dispositif ULIS du collège Anselme Mathieu. En partant de leurs mots et de leurs images, les collégiens explorent la notion de voyage intérieur et collectif, et imaginent une illustration visuelle et sonore de leurs poèmes acrostiches.","slug":"cine-poemes"}	{"titre":"Ciné-poèmes","body":"Ciné-poèmes avec le dispositif ULIS du collège Anselme Mathieu\\n« Nous, poètes du monde… voyageons tel ULIS » propose une immersion poétique avec les jeunes du dispositif ULIS du collège Anselme Mathieu. En partant de leurs mots et de leurs images, les collégiens explorent la notion de voyage intérieur et collectif, et imaginent une illustration visuelle et sonore de leurs poèmes acrostiches.","slug":"cine-poemes"}	\N	\N
67	82	mediations	6	{"titre":"Miquette, Chimamanda et nous","body":"Miquette, Chimamanda et nous, classe de 2d2 \\nPortrait documentaire réalisé par la classe de 2d2 du lycée René Char, explore les questions de féminisme, de liberté et de transmission. Les élèves y font dialoguer la parole de Miquette Bourgeois, militante avignonnaise de 94 ans, et celle de Chimamanda Ngozi Adichie à travers Chère Ijeawele , ou un manifeste pour une éducation féministe  En mêlant écriture, voix off et travail d’images, ils interrogent leurs propres représentations du féminisme.\\n","slug":"miquette-Chimamanda-et-nous"}	{"titre":"Miquette, Chimamanda et nous","body":"Miquette, Chimamanda et nous, classe de 2d2 \\nPortrait documentaire réalisé par la classe de 2d2 du lycée René Char, explore les questions de féminisme, de liberté et de transmission. Les élèves y font dialoguer la parole de Miquette Bourgeois, militante avignonnaise de 94 ans, et celle de Chimamanda Ngozi Adichie à travers Chère Ijeawele , ou un manifeste pour une éducation féministe  En mêlant écriture, voix off et travail d’images, ils interrogent leurs propres représentations du féminisme.\\n","slug":"miquette-Chimamanda-et-nous"}	\N	\N
79	96	mediations	2	{"id":2,"slug":"la-complainte-de-la-lune","titre":"La Complainte de la Lune","sous_titre":null,"date":"2023-11-19T12:00:00","body":"Un conte écologique, adapté du conte Le joueur de flûte de Hamelin \\nD’après les Frères Grimm\\nUn atelier encadré par Florine Clap et Brice Theate.\\n","image":"202c2c10-cc9b-4a6c-aca6-6221deb2a038","video":"37b77938-7168-4525-b6ba-58d2062bf267","categorie":"court-metrages"}	{"video":"37b77938-7168-4525-b6ba-58d2062bf267"}	\N	\N
68	83	mediations	7	{"titre":"Spécial spatiale","body":"Spécial spatiale  \\nCourt métrage joyeusement absurde et bricolé explorant les thèmes de l’étrangeté et l’étranger, écrit et tourné en une seule journée de manière participative avec des mineurs non accompagnés et des familles sans papiers. Un regard poétique et collectif sur l’exil. \\n\\nAtelier encadré par Karine Music","slug":"spécial-spatiale","categorie":"court-metrages"}	{"titre":"Spécial spatiale","body":"Spécial spatiale  \\nCourt métrage joyeusement absurde et bricolé explorant les thèmes de l’étrangeté et l’étranger, écrit et tourné en une seule journée de manière participative avec des mineurs non accompagnés et des familles sans papiers. Un regard poétique et collectif sur l’exil. \\n\\nAtelier encadré par Karine Music","slug":"spécial-spatiale","categorie":"court-metrages"}	\N	\N
69	84	mediations	8	{"body":"C’est pas la mer à boire \\nLe lip dub est un atelier de performance collective autour d’un morceau de musique, ici C’est pas la mer à boire des Négresses Vertes. \\nUn dimanche au bord de mer particulièrement venteux, les travailleurs de l’ESAT d’Orange et les bénévoles de 123 Soleil se sont retrouvés pour chanter, danser et créer ensemble. Une célébration joyeuse de la différence et de la solidarité. \\nUn Lip Dub animé par Karine Music","titre":"C’est pas la mer à boire  ","slug":"c-est-pas-la-mer-a-boire  "}	{"body":"C’est pas la mer à boire \\nLe lip dub est un atelier de performance collective autour d’un morceau de musique, ici C’est pas la mer à boire des Négresses Vertes. \\nUn dimanche au bord de mer particulièrement venteux, les travailleurs de l’ESAT d’Orange et les bénévoles de 123 Soleil se sont retrouvés pour chanter, danser et créer ensemble. Une célébration joyeuse de la différence et de la solidarité. \\nUn Lip Dub animé par Karine Music","titre":"C’est pas la mer à boire  ","slug":"c-est-pas-la-mer-a-boire  "}	\N	\N
70	85	directus_files	57ff286f-5605-4534-b6dc-b1f995141a1e	{"title":"8b5531c5 43bb 47e6 Bb4d F1c266728d8a","filename_download":"8b5531c5-43bb-47e6-bb4d-f1c266728d8a.webm","type":"video/webm","storage":"local"}	{"title":"8b5531c5 43bb 47e6 Bb4d F1c266728d8a","filename_download":"8b5531c5-43bb-47e6-bb4d-f1c266728d8a.webm","type":"video/webm","storage":"local"}	\N	\N
71	86	directus_fields	15	{"id":15,"collection":"mediations","field":"categorie","special":null,"interface":"select-dropdown","options":{"choices":[{"text":"Courts-métrages","value":"court-metrages"},{"text":"Lipdub","value":"lipdub"},{"text":"Médiation","value":"mediation"}]},"display":null,"display_options":null,"readonly":false,"hidden":false,"sort":9,"width":"full","translations":null,"note":null,"conditions":null,"required":false,"group":null,"validation":null,"validation_message":null,"searchable":true}	{"collection":"mediations","field":"categorie","options":{"choices":[{"text":"Courts-métrages","value":"court-metrages"},{"text":"Lipdub","value":"lipdub"},{"text":"Médiation","value":"mediation"}]}}	\N	\N
72	87	directus_files	d9251361-9796-49b9-b960-3781e7d07bab	{"title":"5ea01a8b 7de2 4b62 B72c 731560a74850","filename_download":"5ea01a8b-7de2-4b62-b72c-731560a74850.mp4","type":"video/mp4","storage":"local"}	{"title":"5ea01a8b 7de2 4b62 B72c 731560a74850","filename_download":"5ea01a8b-7de2-4b62-b72c-731560a74850.mp4","type":"video/mp4","storage":"local"}	\N	\N
73	90	directus_settings	1	{"id":1,"project_name":"123Soleil","project_url":null,"project_color":"#FFC23B","project_logo":null,"public_foreground":null,"public_background":null,"public_note":null,"auth_login_attempts":25,"auth_password_policy":null,"storage_asset_transform":"all","storage_asset_presets":null,"custom_css":null,"storage_default_folder":null,"basemaps":null,"mapbox_key":null,"module_bar":null,"project_descriptor":null,"default_language":"en-US","custom_aspect_ratios":null,"public_favicon":null,"default_appearance":"auto","default_theme_light":"Directus Default","theme_light_overrides":null,"default_theme_dark":null,"theme_dark_overrides":null,"report_error_url":null,"report_bug_url":null,"report_feature_url":null,"public_registration":false,"public_registration_verify_email":true,"public_registration_role":null,"public_registration_email_filter":null,"visual_editor_urls":null,"project_id":"019c22fc-e2d3-74ad-8d0c-7cf891f25a3a","mcp_enabled":false,"mcp_allow_deletes":false,"mcp_prompts_collection":null,"mcp_system_prompt_enabled":true,"mcp_system_prompt":null,"project_owner":"takcastel@gmail.com","project_usage":"commercial","org_name":"123Soleil","product_updates":true,"project_status":null,"ai_openai_api_key":null,"ai_anthropic_api_key":null,"ai_system_prompt":null}	{"project_name":"123Soleil"}	\N	\N
74	91	directus_settings	1	{"id":1,"project_name":"123Soleil","project_url":"https://123soleil-cinema.fr/","project_color":"#FFC23B","project_logo":null,"public_foreground":null,"public_background":null,"public_note":null,"auth_login_attempts":25,"auth_password_policy":null,"storage_asset_transform":"all","storage_asset_presets":null,"custom_css":null,"storage_default_folder":null,"basemaps":null,"mapbox_key":null,"module_bar":null,"project_descriptor":null,"default_language":"en-US","custom_aspect_ratios":null,"public_favicon":null,"default_appearance":"auto","default_theme_light":"Directus Default","theme_light_overrides":null,"default_theme_dark":null,"theme_dark_overrides":null,"report_error_url":null,"report_bug_url":null,"report_feature_url":null,"public_registration":false,"public_registration_verify_email":true,"public_registration_role":null,"public_registration_email_filter":null,"visual_editor_urls":null,"project_id":"019c22fc-e2d3-74ad-8d0c-7cf891f25a3a","mcp_enabled":false,"mcp_allow_deletes":false,"mcp_prompts_collection":null,"mcp_system_prompt_enabled":true,"mcp_system_prompt":null,"project_owner":"takcastel@gmail.com","project_usage":"commercial","org_name":"123Soleil","product_updates":true,"project_status":null,"ai_openai_api_key":null,"ai_anthropic_api_key":null,"ai_system_prompt":null}	{"project_url":"https://123soleil-cinema.fr/"}	\N	\N
75	92	directus_settings	1	{"id":1,"project_name":"123Soleil","project_url":"https://123soleil-cinema.fr/","project_color":"#FFC23B","project_logo":null,"public_foreground":null,"public_background":null,"public_note":null,"auth_login_attempts":25,"auth_password_policy":null,"storage_asset_transform":"all","storage_asset_presets":null,"custom_css":null,"storage_default_folder":null,"basemaps":null,"mapbox_key":null,"module_bar":null,"project_descriptor":null,"default_language":"fr-FR","custom_aspect_ratios":null,"public_favicon":null,"default_appearance":"auto","default_theme_light":"Directus Default","theme_light_overrides":null,"default_theme_dark":null,"theme_dark_overrides":null,"report_error_url":null,"report_bug_url":null,"report_feature_url":null,"public_registration":false,"public_registration_verify_email":true,"public_registration_role":null,"public_registration_email_filter":null,"visual_editor_urls":null,"project_id":"019c22fc-e2d3-74ad-8d0c-7cf891f25a3a","mcp_enabled":false,"mcp_allow_deletes":false,"mcp_prompts_collection":null,"mcp_system_prompt_enabled":true,"mcp_system_prompt":null,"project_owner":"takcastel@gmail.com","project_usage":"commercial","org_name":"123Soleil","product_updates":true,"project_status":null,"ai_openai_api_key":null,"ai_anthropic_api_key":null,"ai_system_prompt":null}	{"default_language":"fr-FR"}	\N	\N
78	95	directus_files	37b77938-7168-4525-b6ba-58d2062bf267	{"title":"Complainte De La Lune","filename_download":"Complainte de la lune.mp4","type":"video/mp4","storage":"local"}	{"title":"Complainte De La Lune","filename_download":"Complainte de la lune.mp4","type":"video/mp4","storage":"local"}	\N	\N
80	97	mediations	3	{"id":3,"slug":"comment-j-ai-battu-le-record-du-tour-des-remparts","titre":"Comment j'ai battu le record du tour des remparts","sous_titre":null,"date":null,"body":"Des copains se lancent un défi : faire le tour des remparts le plus vite possible. \\nUn atelier encadré par Florine Clap et José Joilan. \\nAvignon 2018\\n","image":"0a3eacd0-1db7-4673-8a24-06b5dec8555b","video":"fb3738a6-3ac0-4443-843e-ee987f405c7a","categorie":"court-metrages"}	{"video":"fb3738a6-3ac0-4443-843e-ee987f405c7a"}	\N	\N
81	98	mediations	4	{"id":4,"slug":"raconte-moi-ton-ecole","titre":"Raconte-moi ton école ","sous_titre":null,"date":null,"body":"Une médiation proposé par Florine Clap et Nans Pierson. \\n\\nCe dispositif invite les adolescent·es à choisir un espace de leur IME (Institut médico-éducatif), un morceau de musique, et à investir le lieu choisi en y dansant. Sous forme de portraits vidéo, ces ados nous font visiter leur lieu de vie et d'apprentissage en dansant. Ce dispositif ouvre ainsi tout un champ d'expression corporelle et intime devant la caméra.","image":"188f5cbd-bec3-44ca-8fe9-f72252b92f0f","video":null,"categorie":"mediation"}	{"image":"188f5cbd-bec3-44ca-8fe9-f72252b92f0f","categorie":"mediation"}	\N	\N
83	100	mediations	6	{"id":6,"slug":"miquette-Chimamanda-et-nous","titre":"Miquette, Chimamanda et nous","sous_titre":null,"date":null,"body":"Miquette, Chimamanda et nous, classe de 2d2 \\nPortrait documentaire réalisé par la classe de 2d2 du lycée René Char, explore les questions de féminisme, de liberté et de transmission. Les élèves y font dialoguer la parole de Miquette Bourgeois, militante avignonnaise de 94 ans, et celle de Chimamanda Ngozi Adichie à travers Chère Ijeawele , ou un manifeste pour une éducation féministe  En mêlant écriture, voix off et travail d’images, ils interrogent leurs propres représentations du féminisme.\\n","image":null,"video":null,"categorie":"mediation"}	{"categorie":"mediation"}	\N	\N
84	101	mediations	8	{"id":8,"slug":"c-est-pas-la-mer-a-boire  ","titre":"C’est pas la mer à boire  ","sous_titre":null,"date":null,"body":"C’est pas la mer à boire \\nLe lip dub est un atelier de performance collective autour d’un morceau de musique, ici C’est pas la mer à boire des Négresses Vertes. \\nUn dimanche au bord de mer particulièrement venteux, les travailleurs de l’ESAT d’Orange et les bénévoles de 123 Soleil se sont retrouvés pour chanter, danser et créer ensemble. Une célébration joyeuse de la différence et de la solidarité. \\nUn Lip Dub animé par Karine Music","image":null,"video":null,"categorie":"lipdub"}	{"categorie":"lipdub"}	\N	\N
82	99	mediations	5	{"id":5,"slug":"cine-poemes","titre":"Ciné-poèmes","sous_titre":null,"date":null,"body":"Ciné-poèmes avec le dispositif ULIS du collège Anselme Mathieu\\n« Nous, poètes du monde… voyageons tel ULIS » propose une immersion poétique avec les jeunes du dispositif ULIS du collège Anselme Mathieu. En partant de leurs mots et de leurs images, les collégiens explorent la notion de voyage intérieur et collectif, et imaginent une illustration visuelle et sonore de leurs poèmes acrostiches.","image":null,"video":null,"categorie":"mediation"}	{"categorie":"mediation"}	\N	\N
85	102	directus_fields	15	{"id":15,"collection":"mediations","field":"categorie","special":null,"interface":"select-dropdown","options":{"choices":[{"text":"Courts-métrages","value":"court-metrages"},{"text":"Lipdubs","value":"lipdubs"},{"text":"Médiations","value":"mediations"}]},"display":null,"display_options":null,"readonly":false,"hidden":false,"sort":9,"width":"full","translations":null,"note":null,"conditions":null,"required":false,"group":null,"validation":null,"validation_message":null,"searchable":true}	{"collection":"mediations","field":"categorie","options":{"choices":[{"text":"Courts-métrages","value":"court-metrages"},{"text":"Lipdubs","value":"lipdubs"},{"text":"Médiations","value":"mediations"}]}}	\N	\N
86	103	mediations	4	{"id":4,"slug":"raconte-moi-ton-ecole","titre":"Raconte-moi ton école ","sous_titre":null,"date":null,"body":"Une médiation proposé par Florine Clap et Nans Pierson. \\n\\nCe dispositif invite les adolescent·es à choisir un espace de leur IME (Institut médico-éducatif), un morceau de musique, et à investir le lieu choisi en y dansant. Sous forme de portraits vidéo, ces ados nous font visiter leur lieu de vie et d'apprentissage en dansant. Ce dispositif ouvre ainsi tout un champ d'expression corporelle et intime devant la caméra.","image":"188f5cbd-bec3-44ca-8fe9-f72252b92f0f","video":null,"categorie":"mediations"}	{"categorie":"mediations"}	\N	\N
87	104	mediations	5	{"id":5,"slug":"cine-poemes","titre":"Ciné-poèmes","sous_titre":null,"date":null,"body":"Ciné-poèmes avec le dispositif ULIS du collège Anselme Mathieu\\n« Nous, poètes du monde… voyageons tel ULIS » propose une immersion poétique avec les jeunes du dispositif ULIS du collège Anselme Mathieu. En partant de leurs mots et de leurs images, les collégiens explorent la notion de voyage intérieur et collectif, et imaginent une illustration visuelle et sonore de leurs poèmes acrostiches.","image":null,"video":null,"categorie":"mediations"}	{"categorie":"mediations"}	\N	\N
88	105	mediations	6	{"id":6,"slug":"miquette-Chimamanda-et-nous","titre":"Miquette, Chimamanda et nous","sous_titre":null,"date":null,"body":"Miquette, Chimamanda et nous, classe de 2d2 \\nPortrait documentaire réalisé par la classe de 2d2 du lycée René Char, explore les questions de féminisme, de liberté et de transmission. Les élèves y font dialoguer la parole de Miquette Bourgeois, militante avignonnaise de 94 ans, et celle de Chimamanda Ngozi Adichie à travers Chère Ijeawele , ou un manifeste pour une éducation féministe  En mêlant écriture, voix off et travail d’images, ils interrogent leurs propres représentations du féminisme.\\n","image":null,"video":null,"categorie":"mediations"}	{"categorie":"mediations"}	\N	\N
89	106	mediations	8	{"id":8,"slug":"c-est-pas-la-mer-a-boire  ","titre":"C’est pas la mer à boire  ","sous_titre":null,"date":null,"body":"C’est pas la mer à boire \\nLe lip dub est un atelier de performance collective autour d’un morceau de musique, ici C’est pas la mer à boire des Négresses Vertes. \\nUn dimanche au bord de mer particulièrement venteux, les travailleurs de l’ESAT d’Orange et les bénévoles de 123 Soleil se sont retrouvés pour chanter, danser et créer ensemble. Une célébration joyeuse de la différence et de la solidarité. \\nUn Lip Dub animé par Karine Music","image":null,"video":null,"categorie":"lipdubs"}	{"categorie":"lipdubs"}	\N	\N
90	107	directus_files	b5866747-4647-4697-ac57-586f92e5aa2b	{"title":"Mikette, Chimamanda Et Nous Etc","filename_download":"MIKETTE, chimamanda et nous ETC.JPG","type":"image/jpeg","storage":"local"}	{"title":"Mikette, Chimamanda Et Nous Etc","filename_download":"MIKETTE, chimamanda et nous ETC.JPG","type":"image/jpeg","storage":"local"}	\N	\N
91	108	directus_files	74f06d27-9b78-4970-8382-e1f06eb8918b	{"title":"Special Spatiale","filename_download":"special spatiale.jpg","type":"image/jpeg","storage":"local"}	{"title":"Special Spatiale","filename_download":"special spatiale.jpg","type":"image/jpeg","storage":"local"}	\N	\N
92	109	directus_files	f9ce4826-96b0-4bfd-a2e8-08dfd2e2d36b	{"title":"Cinepoeme","filename_download":"cinepoeme.png","type":"image/png","storage":"local"}	{"title":"Cinepoeme","filename_download":"cinepoeme.png","type":"image/png","storage":"local"}	\N	\N
93	110	directus_files	ec878bb7-2a34-4635-9c87-9ea528a35112	{"title":"Lip Dub C Pas La Mer À Boire","filename_download":"LIP DUB C pas la mer à boire.jpg","type":"image/jpeg","storage":"local"}	{"title":"Lip Dub C Pas La Mer À Boire","filename_download":"LIP DUB C pas la mer à boire.jpg","type":"image/jpeg","storage":"local"}	\N	\N
94	111	mediations	5	{"id":5,"slug":"cine-poemes","titre":"Ciné-poèmes","sous_titre":null,"date":null,"body":"Ciné-poèmes avec le dispositif ULIS du collège Anselme Mathieu\\n« Nous, poètes du monde… voyageons tel ULIS » propose une immersion poétique avec les jeunes du dispositif ULIS du collège Anselme Mathieu. En partant de leurs mots et de leurs images, les collégiens explorent la notion de voyage intérieur et collectif, et imaginent une illustration visuelle et sonore de leurs poèmes acrostiches.","image":"f9ce4826-96b0-4bfd-a2e8-08dfd2e2d36b","video":null,"categorie":"mediations"}	{"image":"f9ce4826-96b0-4bfd-a2e8-08dfd2e2d36b"}	\N	\N
95	112	mediations	6	{"id":6,"slug":"miquette-Chimamanda-et-nous","titre":"Miquette, Chimamanda et nous","sous_titre":null,"date":null,"body":"Miquette, Chimamanda et nous, classe de 2d2 \\nPortrait documentaire réalisé par la classe de 2d2 du lycée René Char, explore les questions de féminisme, de liberté et de transmission. Les élèves y font dialoguer la parole de Miquette Bourgeois, militante avignonnaise de 94 ans, et celle de Chimamanda Ngozi Adichie à travers Chère Ijeawele , ou un manifeste pour une éducation féministe  En mêlant écriture, voix off et travail d’images, ils interrogent leurs propres représentations du féminisme.\\n","image":"b5866747-4647-4697-ac57-586f92e5aa2b","video":null,"categorie":"mediations"}	{"image":"b5866747-4647-4697-ac57-586f92e5aa2b"}	\N	\N
96	113	mediations	7	{"id":7,"slug":"spécial-spatiale","titre":"Spécial spatiale","sous_titre":null,"date":null,"body":"Spécial spatiale  \\nCourt métrage joyeusement absurde et bricolé explorant les thèmes de l’étrangeté et l’étranger, écrit et tourné en une seule journée de manière participative avec des mineurs non accompagnés et des familles sans papiers. Un regard poétique et collectif sur l’exil. \\n\\nAtelier encadré par Karine Music","image":"74f06d27-9b78-4970-8382-e1f06eb8918b","video":null,"categorie":"court-metrages"}	{"image":"74f06d27-9b78-4970-8382-e1f06eb8918b"}	\N	\N
97	114	mediations	8	{"id":8,"slug":"c-est-pas-la-mer-a-boire  ","titre":"C’est pas la mer à boire  ","sous_titre":null,"date":null,"body":"C’est pas la mer à boire \\nLe lip dub est un atelier de performance collective autour d’un morceau de musique, ici C’est pas la mer à boire des Négresses Vertes. \\nUn dimanche au bord de mer particulièrement venteux, les travailleurs de l’ESAT d’Orange et les bénévoles de 123 Soleil se sont retrouvés pour chanter, danser et créer ensemble. Une célébration joyeuse de la différence et de la solidarité. \\nUn Lip Dub animé par Karine Music","image":"ec878bb7-2a34-4635-9c87-9ea528a35112","video":null,"categorie":"lipdubs"}	{"image":"ec878bb7-2a34-4635-9c87-9ea528a35112"}	\N	\N
98	115	directus_files	0a6a0f70-d167-4cb8-8a02-bb467b9f960c	{"title":"Ciné Poème Nous, Poètes Du Monde... Voyageons Tel Ulis Dispo Ulis Collehe a Nselme Mathieu, Karine(1080p)","filename_download":"ciné poème nous,_poètes_du_monde..._voyageons_tel_ulis_dispo ULIS collehe ANselme Mathieu, Karine(1080p).mp4","type":"video/mp4","storage":"local"}	{"title":"Ciné Poème Nous, Poètes Du Monde... Voyageons Tel Ulis Dispo Ulis Collehe a Nselme Mathieu, Karine(1080p)","filename_download":"ciné poème nous,_poètes_du_monde..._voyageons_tel_ulis_dispo ULIS collehe ANselme Mathieu, Karine(1080p).mp4","type":"video/mp4","storage":"local"}	\N	\N
99	116	directus_files	5e14f07a-8783-4906-b175-76c6eaa42d6d	{"title":"Lip Dub   Avec Les Habitants Du Foyer D'hébergement  Esat  D'orange 1 Journée (1080p)karine","filename_download":"lip_dub_-_avec_les_habitants_du_foyer_d'hébergement_-esat-_d'orange_1 journée (1080p)Karine.mp4","type":"video/mp4","storage":"local"}	{"title":"Lip Dub   Avec Les Habitants Du Foyer D'hébergement  Esat  D'orange 1 Journée (1080p)karine","filename_download":"lip_dub_-_avec_les_habitants_du_foyer_d'hébergement_-esat-_d'orange_1 journée (1080p)Karine.mp4","type":"video/mp4","storage":"local"}	\N	\N
100	117	directus_files	378b8233-d65d-4d8b-af6a-474e90d9c70b	{"title":"Cm Spécial Spatial Court Métrage 1 Journée Mna Rosmerta   Avignonais  Karine(1080p)","filename_download":"CM spécial_spatial_court métrage 1 journée MNA Rosmerta - avignonais- karine(1080p).mp4","type":"video/mp4","storage":"local"}	{"title":"Cm Spécial Spatial Court Métrage 1 Journée Mna Rosmerta   Avignonais  Karine(1080p)","filename_download":"CM spécial_spatial_court métrage 1 journée MNA Rosmerta - avignonais- karine(1080p).mp4","type":"video/mp4","storage":"local"}	\N	\N
101	118	directus_files	08c609ee-463a-4777-929d-fecf3ed6cb9e	{"title":"Docu Mikette, Chimamanda Et Nous, Classe De Seconde2 Lycée René Char Karine(1080p)","filename_download":"docu mikette,_chimamanda_et_nous,_classe_de_seconde2 lycée rené char karine(1080p).mp4","type":"video/mp4","storage":"local"}	{"title":"Docu Mikette, Chimamanda Et Nous, Classe De Seconde2 Lycée René Char Karine(1080p)","filename_download":"docu mikette,_chimamanda_et_nous,_classe_de_seconde2 lycée rené char karine(1080p).mp4","type":"video/mp4","storage":"local"}	\N	\N
102	119	mediations	5	{"id":5,"slug":"cine-poemes","titre":"Ciné-poèmes","sous_titre":null,"date":null,"body":"Ciné-poèmes avec le dispositif ULIS du collège Anselme Mathieu\\n« Nous, poètes du monde… voyageons tel ULIS » propose une immersion poétique avec les jeunes du dispositif ULIS du collège Anselme Mathieu. En partant de leurs mots et de leurs images, les collégiens explorent la notion de voyage intérieur et collectif, et imaginent une illustration visuelle et sonore de leurs poèmes acrostiches.","image":"f9ce4826-96b0-4bfd-a2e8-08dfd2e2d36b","video":"0a6a0f70-d167-4cb8-8a02-bb467b9f960c","categorie":"mediations"}	{"video":"0a6a0f70-d167-4cb8-8a02-bb467b9f960c"}	\N	\N
103	120	mediations	6	{"id":6,"slug":"miquette-Chimamanda-et-nous","titre":"Miquette, Chimamanda et nous","sous_titre":null,"date":null,"body":"Miquette, Chimamanda et nous, classe de 2d2 \\nPortrait documentaire réalisé par la classe de 2d2 du lycée René Char, explore les questions de féminisme, de liberté et de transmission. Les élèves y font dialoguer la parole de Miquette Bourgeois, militante avignonnaise de 94 ans, et celle de Chimamanda Ngozi Adichie à travers Chère Ijeawele , ou un manifeste pour une éducation féministe  En mêlant écriture, voix off et travail d’images, ils interrogent leurs propres représentations du féminisme.\\n","image":"b5866747-4647-4697-ac57-586f92e5aa2b","video":"08c609ee-463a-4777-929d-fecf3ed6cb9e","categorie":"mediations"}	{"video":"08c609ee-463a-4777-929d-fecf3ed6cb9e"}	\N	\N
104	121	mediations	7	{"id":7,"slug":"spécial-spatiale","titre":"Spécial spatiale","sous_titre":null,"date":null,"body":"Spécial spatiale  \\nCourt métrage joyeusement absurde et bricolé explorant les thèmes de l’étrangeté et l’étranger, écrit et tourné en une seule journée de manière participative avec des mineurs non accompagnés et des familles sans papiers. Un regard poétique et collectif sur l’exil. \\n\\nAtelier encadré par Karine Music","image":"74f06d27-9b78-4970-8382-e1f06eb8918b","video":"378b8233-d65d-4d8b-af6a-474e90d9c70b","categorie":"court-metrages"}	{"video":"378b8233-d65d-4d8b-af6a-474e90d9c70b"}	\N	\N
105	122	mediations	8	{"id":8,"slug":"c-est-pas-la-mer-a-boire  ","titre":"C’est pas la mer à boire  ","sous_titre":null,"date":null,"body":"C’est pas la mer à boire \\nLe lip dub est un atelier de performance collective autour d’un morceau de musique, ici C’est pas la mer à boire des Négresses Vertes. \\nUn dimanche au bord de mer particulièrement venteux, les travailleurs de l’ESAT d’Orange et les bénévoles de 123 Soleil se sont retrouvés pour chanter, danser et créer ensemble. Une célébration joyeuse de la différence et de la solidarité. \\nUn Lip Dub animé par Karine Music","image":"ec878bb7-2a34-4635-9c87-9ea528a35112","video":"5e14f07a-8783-4906-b175-76c6eaa42d6d","categorie":"lipdubs"}	{"video":"5e14f07a-8783-4906-b175-76c6eaa42d6d"}	\N	\N
106	123	mediations	7	{"id":7,"slug":"special-spatiale","titre":"Spécial spatiale","sous_titre":null,"date":null,"body":"Spécial spatiale  \\nCourt métrage joyeusement absurde et bricolé explorant les thèmes de l’étrangeté et l’étranger, écrit et tourné en une seule journée de manière participative avec des mineurs non accompagnés et des familles sans papiers. Un regard poétique et collectif sur l’exil. \\n\\nAtelier encadré par Karine Music","image":"74f06d27-9b78-4970-8382-e1f06eb8918b","video":"378b8233-d65d-4d8b-af6a-474e90d9c70b","categorie":"court-metrages"}	{"slug":"special-spatiale"}	\N	\N
\.


--
-- Data for Name: directus_roles; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_roles (id, name, icon, description, parent) FROM stdin;
fd98cdf0-be10-450e-a724-7047266d3e1d	Administrator	verified	$t:admin_description	\N
\.


--
-- Data for Name: directus_sessions; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_sessions (token, "user", expires, ip, user_agent, share, origin, next_token) FROM stdin;
5PN4M8RbDgrNmAAby9IGFfmYw6lWWjGc-O06GcUUHQiDzwG88L-vGORizjE124HZ	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-10 10:27:05.351+00	172.18.0.4	node	\N	\N	\N
ipyVVrkm4ZpjP6SNAFLAJY6rMAVffQEDkpbkU_NakvHjahj5fq1TsJw4fzeXMDVk	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-10 10:27:15.521+00	172.18.0.4	node	\N	\N	\N
jA8OV4ZP7XCyGPHjUJfEN-87PnkQUFQ3vNR3vXARQ_53de_jtGCOD4T95C9z1Mah	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-10 10:28:52.574+00	172.18.0.4	node	\N	\N	\N
dhYGpK_4o686rStkbL8wYvYl4mN8HMGh8336rGquGTZcpVbiwZInu10zLXWWGJi6	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-10 11:23:59.794+00	172.18.0.1	node	\N	\N	\N
dqwai3LbMdNYht5folQDIXudghszKaJoTxzJWigx6Lche-kQO10iDmlTaQNxLe6N	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 15:39:24.298+00	77.205.21.166	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	\N	https://api.123soleil-cinema.fr	\N
pn-Vyg7bJBsgSYVkZCOlwVhEpY2u0xzFUWb9r3rSB2tALDq_DohM-WIKPlg1ItBq	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-05 08:41:22.92+00	78.126.109.204	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	\N	https://api.123soleil-cinema.fr	\N
oqwqrMlZCZL8LXLLwe_DV_yKpoa9p-j-5J16VJyNxV26I90TNLAFlqC68doZiZYI	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 15:40:54.288+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	\N	https://api.123soleil-cinema.fr	\N
ioNDDI0aTANYwqbsB0GTu9QPSoB-4Bfz6ckPEersd5tc6E3m21ez_2iBAionRIF5	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-04 08:50:35.038+00	77.205.21.166	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	\N	https://api.123soleil-cinema.fr	C1Ar2EFJxkyPkp2OgmUnIfk5h1s4Kcfc98BK8uMOKums_3vfoSgD-Jc-KjO9929C
C1Ar2EFJxkyPkp2OgmUnIfk5h1s4Kcfc98BK8uMOKums_3vfoSgD-Jc-KjO9929C	7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	2026-02-05 08:50:25.038+00	78.126.111.205	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	\N	https://api.123soleil-cinema.fr	\N
\.


--
-- Data for Name: directus_settings; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_settings (id, project_name, project_url, project_color, project_logo, public_foreground, public_background, public_note, auth_login_attempts, auth_password_policy, storage_asset_transform, storage_asset_presets, custom_css, storage_default_folder, basemaps, mapbox_key, module_bar, project_descriptor, default_language, custom_aspect_ratios, public_favicon, default_appearance, default_theme_light, theme_light_overrides, default_theme_dark, theme_dark_overrides, report_error_url, report_bug_url, report_feature_url, public_registration, public_registration_verify_email, public_registration_role, public_registration_email_filter, visual_editor_urls, project_id, mcp_enabled, mcp_allow_deletes, mcp_prompts_collection, mcp_system_prompt_enabled, mcp_system_prompt, project_owner, project_usage, org_name, product_updates, project_status, ai_openai_api_key, ai_anthropic_api_key, ai_system_prompt) FROM stdin;
1	123Soleil	https://123soleil-cinema.fr/	#FFC23B	\N	\N	\N	\N	25	\N	all	\N	\N	\N	\N	\N	\N	\N	fr-FR	\N	\N	auto	Directus Default	\N	\N	\N	\N	\N	\N	f	t	\N	\N	\N	019c22fc-e2d3-74ad-8d0c-7cf891f25a3a	f	f	\N	t	\N	takcastel@gmail.com	commercial	123Soleil	t	\N	\N	\N	\N
\.


--
-- Data for Name: directus_shares; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_shares (id, name, collection, item, role, password, user_created, date_created, date_start, date_end, times_used, max_uses) FROM stdin;
\.


--
-- Data for Name: directus_translations; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_translations (id, language, key, value) FROM stdin;
\.


--
-- Data for Name: directus_users; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_users (id, first_name, last_name, email, password, location, title, description, tags, avatar, language, tfa_secret, status, role, token, last_access, last_page, provider, external_identifier, auth_data, email_notifications, appearance, theme_dark, theme_light, theme_light_overrides, theme_dark_overrides, text_direction) FROM stdin;
7a6ef8cf-5d2f-4965-bd10-94467acb5c7d	Admin	User	admin@example.com	$argon2id$v=19$m=65536,t=3,p=4$oI+8zh2+Og4zDQFkPVu4KQ$nk321oxSON+IE3QW+O0puma5kHM5NKh1lSOZJBC6ZHs	\N	\N	\N	\N	\N	\N	\N	active	fd98cdf0-be10-450e-a724-7047266d3e1d	\N	2026-02-04 08:50:25.041+00	/content/mediations	default	\N	\N	t	\N	\N	\N	\N	\N	auto
\.


--
-- Data for Name: directus_versions; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.directus_versions (id, key, name, collection, item, hash, date_created, date_updated, user_created, user_updated, delta) FROM stdin;
\.


--
-- Data for Name: home_settings; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.home_settings (id) FROM stdin;
\.


--
-- Data for Name: home_settings_files; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.home_settings_files (id, home_settings_id, directus_files_id, sort) FROM stdin;
\.


--
-- Data for Name: mediations; Type: TABLE DATA; Schema: public; Owner: directus
--

COPY public.mediations (id, slug, titre, sous_titre, date, body, image, video, categorie) FROM stdin;
7	special-spatiale	Spécial spatiale	\N	\N	Spécial spatiale  \nCourt métrage joyeusement absurde et bricolé explorant les thèmes de l’étrangeté et l’étranger, écrit et tourné en une seule journée de manière participative avec des mineurs non accompagnés et des familles sans papiers. Un regard poétique et collectif sur l’exil. \n\nAtelier encadré par Karine Music	74f06d27-9b78-4970-8382-e1f06eb8918b	378b8233-d65d-4d8b-af6a-474e90d9c70b	court-metrages
4	raconte-moi-ton-ecole	Raconte-moi ton école 	\N	\N	Une médiation proposé par Florine Clap et Nans Pierson. \n\nCe dispositif invite les adolescent·es à choisir un espace de leur IME (Institut médico-éducatif), un morceau de musique, et à investir le lieu choisi en y dansant. Sous forme de portraits vidéo, ces ados nous font visiter leur lieu de vie et d'apprentissage en dansant. Ce dispositif ouvre ainsi tout un champ d'expression corporelle et intime devant la caméra.	188f5cbd-bec3-44ca-8fe9-f72252b92f0f	\N	mediations
2	la-complainte-de-la-lune	La Complainte de la Lune	\N	2023-11-19 12:00:00	Un conte écologique, adapté du conte Le joueur de flûte de Hamelin \nD’après les Frères Grimm\nUn atelier encadré par Florine Clap et Brice Theate.\n	202c2c10-cc9b-4a6c-aca6-6221deb2a038	37b77938-7168-4525-b6ba-58d2062bf267	court-metrages
3	comment-j-ai-battu-le-record-du-tour-des-remparts	Comment j'ai battu le record du tour des remparts	\N	\N	Des copains se lancent un défi : faire le tour des remparts le plus vite possible. \nUn atelier encadré par Florine Clap et José Joilan. \nAvignon 2018\n	0a3eacd0-1db7-4673-8a24-06b5dec8555b	fb3738a6-3ac0-4443-843e-ee987f405c7a	court-metrages
5	cine-poemes	Ciné-poèmes	\N	\N	Ciné-poèmes avec le dispositif ULIS du collège Anselme Mathieu\n« Nous, poètes du monde… voyageons tel ULIS » propose une immersion poétique avec les jeunes du dispositif ULIS du collège Anselme Mathieu. En partant de leurs mots et de leurs images, les collégiens explorent la notion de voyage intérieur et collectif, et imaginent une illustration visuelle et sonore de leurs poèmes acrostiches.	f9ce4826-96b0-4bfd-a2e8-08dfd2e2d36b	0a6a0f70-d167-4cb8-8a02-bb467b9f960c	mediations
6	miquette-Chimamanda-et-nous	Miquette, Chimamanda et nous	\N	\N	Miquette, Chimamanda et nous, classe de 2d2 \nPortrait documentaire réalisé par la classe de 2d2 du lycée René Char, explore les questions de féminisme, de liberté et de transmission. Les élèves y font dialoguer la parole de Miquette Bourgeois, militante avignonnaise de 94 ans, et celle de Chimamanda Ngozi Adichie à travers Chère Ijeawele , ou un manifeste pour une éducation féministe  En mêlant écriture, voix off et travail d’images, ils interrogent leurs propres représentations du féminisme.\n	b5866747-4647-4697-ac57-586f92e5aa2b	08c609ee-463a-4777-929d-fecf3ed6cb9e	mediations
8	c-est-pas-la-mer-a-boire  	C’est pas la mer à boire  	\N	\N	C’est pas la mer à boire \nLe lip dub est un atelier de performance collective autour d’un morceau de musique, ici C’est pas la mer à boire des Négresses Vertes. \nUn dimanche au bord de mer particulièrement venteux, les travailleurs de l’ESAT d’Orange et les bénévoles de 123 Soleil se sont retrouvés pour chanter, danser et créer ensemble. Une célébration joyeuse de la différence et de la solidarité. \nUn Lip Dub animé par Karine Music	ec878bb7-2a34-4635-9c87-9ea528a35112	5e14f07a-8783-4906-b175-76c6eaa42d6d	lipdubs
\.


--
-- Name: actualites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: directus
--

SELECT pg_catalog.setval('public.actualites_id_seq', 1, true);


--
-- Name: directus_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: directus
--

SELECT pg_catalog.setval('public.directus_activity_id_seq', 123, true);


--
-- Name: directus_fields_id_seq; Type: SEQUENCE SET; Schema: public; Owner: directus
--

SELECT pg_catalog.setval('public.directus_fields_id_seq', 23, true);


--
-- Name: directus_notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: directus
--

SELECT pg_catalog.setval('public.directus_notifications_id_seq', 1, false);


--
-- Name: directus_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: directus
--

SELECT pg_catalog.setval('public.directus_permissions_id_seq', 6, true);


--
-- Name: directus_presets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: directus
--

SELECT pg_catalog.setval('public.directus_presets_id_seq', 3, true);


--
-- Name: directus_relations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: directus
--

SELECT pg_catalog.setval('public.directus_relations_id_seq', 5, true);


--
-- Name: directus_revisions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: directus
--

SELECT pg_catalog.setval('public.directus_revisions_id_seq', 106, true);


--
-- Name: directus_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: directus
--

SELECT pg_catalog.setval('public.directus_settings_id_seq', 1, true);


--
-- Name: home_settings_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: directus
--

SELECT pg_catalog.setval('public.home_settings_files_id_seq', 1, false);


--
-- Name: home_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: directus
--

SELECT pg_catalog.setval('public.home_settings_id_seq', 1, false);


--
-- Name: mediations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: directus
--

SELECT pg_catalog.setval('public.mediations_id_seq', 8, true);


--
-- Name: actualites actualites_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.actualites
    ADD CONSTRAINT actualites_pkey PRIMARY KEY (id);


--
-- Name: actualites actualites_slug_unique; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.actualites
    ADD CONSTRAINT actualites_slug_unique UNIQUE (slug);


--
-- Name: directus_access directus_access_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_pkey PRIMARY KEY (id);


--
-- Name: directus_activity directus_activity_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_activity
    ADD CONSTRAINT directus_activity_pkey PRIMARY KEY (id);


--
-- Name: directus_collections directus_collections_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_collections
    ADD CONSTRAINT directus_collections_pkey PRIMARY KEY (collection);


--
-- Name: directus_comments directus_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_comments
    ADD CONSTRAINT directus_comments_pkey PRIMARY KEY (id);


--
-- Name: directus_dashboards directus_dashboards_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_dashboards
    ADD CONSTRAINT directus_dashboards_pkey PRIMARY KEY (id);


--
-- Name: directus_extensions directus_extensions_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_extensions
    ADD CONSTRAINT directus_extensions_pkey PRIMARY KEY (id);


--
-- Name: directus_fields directus_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_fields
    ADD CONSTRAINT directus_fields_pkey PRIMARY KEY (id);


--
-- Name: directus_files directus_files_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_pkey PRIMARY KEY (id);


--
-- Name: directus_flows directus_flows_operation_unique; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_operation_unique UNIQUE (operation);


--
-- Name: directus_flows directus_flows_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_pkey PRIMARY KEY (id);


--
-- Name: directus_folders directus_folders_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_folders
    ADD CONSTRAINT directus_folders_pkey PRIMARY KEY (id);


--
-- Name: directus_migrations directus_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_migrations
    ADD CONSTRAINT directus_migrations_pkey PRIMARY KEY (version);


--
-- Name: directus_notifications directus_notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_pkey PRIMARY KEY (id);


--
-- Name: directus_operations directus_operations_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_pkey PRIMARY KEY (id);


--
-- Name: directus_operations directus_operations_reject_unique; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_reject_unique UNIQUE (reject);


--
-- Name: directus_operations directus_operations_resolve_unique; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_resolve_unique UNIQUE (resolve);


--
-- Name: directus_panels directus_panels_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_pkey PRIMARY KEY (id);


--
-- Name: directus_permissions directus_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_permissions
    ADD CONSTRAINT directus_permissions_pkey PRIMARY KEY (id);


--
-- Name: directus_policies directus_policies_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_policies
    ADD CONSTRAINT directus_policies_pkey PRIMARY KEY (id);


--
-- Name: directus_presets directus_presets_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_pkey PRIMARY KEY (id);


--
-- Name: directus_relations directus_relations_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_relations
    ADD CONSTRAINT directus_relations_pkey PRIMARY KEY (id);


--
-- Name: directus_revisions directus_revisions_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_pkey PRIMARY KEY (id);


--
-- Name: directus_roles directus_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_roles
    ADD CONSTRAINT directus_roles_pkey PRIMARY KEY (id);


--
-- Name: directus_sessions directus_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_pkey PRIMARY KEY (token);


--
-- Name: directus_settings directus_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_pkey PRIMARY KEY (id);


--
-- Name: directus_shares directus_shares_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_pkey PRIMARY KEY (id);


--
-- Name: directus_translations directus_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_translations
    ADD CONSTRAINT directus_translations_pkey PRIMARY KEY (id);


--
-- Name: directus_users directus_users_email_unique; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_email_unique UNIQUE (email);


--
-- Name: directus_users directus_users_external_identifier_unique; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_external_identifier_unique UNIQUE (external_identifier);


--
-- Name: directus_users directus_users_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_pkey PRIMARY KEY (id);


--
-- Name: directus_users directus_users_token_unique; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_token_unique UNIQUE (token);


--
-- Name: directus_versions directus_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_pkey PRIMARY KEY (id);


--
-- Name: home_settings_files home_settings_files_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.home_settings_files
    ADD CONSTRAINT home_settings_files_pkey PRIMARY KEY (id);


--
-- Name: home_settings home_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.home_settings
    ADD CONSTRAINT home_settings_pkey PRIMARY KEY (id);


--
-- Name: mediations mediations_pkey; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.mediations
    ADD CONSTRAINT mediations_pkey PRIMARY KEY (id);


--
-- Name: mediations mediations_slug_unique; Type: CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.mediations
    ADD CONSTRAINT mediations_slug_unique UNIQUE (slug);


--
-- Name: directus_activity_timestamp_index; Type: INDEX; Schema: public; Owner: directus
--

CREATE INDEX directus_activity_timestamp_index ON public.directus_activity USING btree ("timestamp");


--
-- Name: directus_revisions_activity_index; Type: INDEX; Schema: public; Owner: directus
--

CREATE INDEX directus_revisions_activity_index ON public.directus_revisions USING btree (activity);


--
-- Name: directus_revisions_parent_index; Type: INDEX; Schema: public; Owner: directus
--

CREATE INDEX directus_revisions_parent_index ON public.directus_revisions USING btree (parent);


--
-- Name: actualites actualites_image_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.actualites
    ADD CONSTRAINT actualites_image_foreign FOREIGN KEY (image) REFERENCES public.directus_files(id) ON DELETE SET NULL;


--
-- Name: directus_access directus_access_policy_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_policy_foreign FOREIGN KEY (policy) REFERENCES public.directus_policies(id) ON DELETE CASCADE;


--
-- Name: directus_access directus_access_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;


--
-- Name: directus_access directus_access_user_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_access
    ADD CONSTRAINT directus_access_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;


--
-- Name: directus_collections directus_collections_group_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_collections
    ADD CONSTRAINT directus_collections_group_foreign FOREIGN KEY ("group") REFERENCES public.directus_collections(collection);


--
-- Name: directus_comments directus_comments_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_comments
    ADD CONSTRAINT directus_comments_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_comments directus_comments_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_comments
    ADD CONSTRAINT directus_comments_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id);


--
-- Name: directus_dashboards directus_dashboards_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_dashboards
    ADD CONSTRAINT directus_dashboards_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_files directus_files_folder_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_folder_foreign FOREIGN KEY (folder) REFERENCES public.directus_folders(id) ON DELETE SET NULL;


--
-- Name: directus_files directus_files_modified_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_modified_by_foreign FOREIGN KEY (modified_by) REFERENCES public.directus_users(id);


--
-- Name: directus_files directus_files_uploaded_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_files
    ADD CONSTRAINT directus_files_uploaded_by_foreign FOREIGN KEY (uploaded_by) REFERENCES public.directus_users(id);


--
-- Name: directus_flows directus_flows_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_flows
    ADD CONSTRAINT directus_flows_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_folders directus_folders_parent_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_folders
    ADD CONSTRAINT directus_folders_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_folders(id);


--
-- Name: directus_notifications directus_notifications_recipient_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_recipient_foreign FOREIGN KEY (recipient) REFERENCES public.directus_users(id) ON DELETE CASCADE;


--
-- Name: directus_notifications directus_notifications_sender_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_notifications
    ADD CONSTRAINT directus_notifications_sender_foreign FOREIGN KEY (sender) REFERENCES public.directus_users(id);


--
-- Name: directus_operations directus_operations_flow_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_flow_foreign FOREIGN KEY (flow) REFERENCES public.directus_flows(id) ON DELETE CASCADE;


--
-- Name: directus_operations directus_operations_reject_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_reject_foreign FOREIGN KEY (reject) REFERENCES public.directus_operations(id);


--
-- Name: directus_operations directus_operations_resolve_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_resolve_foreign FOREIGN KEY (resolve) REFERENCES public.directus_operations(id);


--
-- Name: directus_operations directus_operations_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_operations
    ADD CONSTRAINT directus_operations_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_panels directus_panels_dashboard_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_dashboard_foreign FOREIGN KEY (dashboard) REFERENCES public.directus_dashboards(id) ON DELETE CASCADE;


--
-- Name: directus_panels directus_panels_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_panels
    ADD CONSTRAINT directus_panels_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_permissions directus_permissions_policy_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_permissions
    ADD CONSTRAINT directus_permissions_policy_foreign FOREIGN KEY (policy) REFERENCES public.directus_policies(id) ON DELETE CASCADE;


--
-- Name: directus_presets directus_presets_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;


--
-- Name: directus_presets directus_presets_user_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_presets
    ADD CONSTRAINT directus_presets_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;


--
-- Name: directus_revisions directus_revisions_activity_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_activity_foreign FOREIGN KEY (activity) REFERENCES public.directus_activity(id) ON DELETE CASCADE;


--
-- Name: directus_revisions directus_revisions_parent_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_revisions(id);


--
-- Name: directus_revisions directus_revisions_version_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_revisions
    ADD CONSTRAINT directus_revisions_version_foreign FOREIGN KEY (version) REFERENCES public.directus_versions(id) ON DELETE CASCADE;


--
-- Name: directus_roles directus_roles_parent_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_roles
    ADD CONSTRAINT directus_roles_parent_foreign FOREIGN KEY (parent) REFERENCES public.directus_roles(id);


--
-- Name: directus_sessions directus_sessions_share_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_share_foreign FOREIGN KEY (share) REFERENCES public.directus_shares(id) ON DELETE CASCADE;


--
-- Name: directus_sessions directus_sessions_user_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_sessions
    ADD CONSTRAINT directus_sessions_user_foreign FOREIGN KEY ("user") REFERENCES public.directus_users(id) ON DELETE CASCADE;


--
-- Name: directus_settings directus_settings_project_logo_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_project_logo_foreign FOREIGN KEY (project_logo) REFERENCES public.directus_files(id);


--
-- Name: directus_settings directus_settings_public_background_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_background_foreign FOREIGN KEY (public_background) REFERENCES public.directus_files(id);


--
-- Name: directus_settings directus_settings_public_favicon_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_favicon_foreign FOREIGN KEY (public_favicon) REFERENCES public.directus_files(id);


--
-- Name: directus_settings directus_settings_public_foreground_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_foreground_foreign FOREIGN KEY (public_foreground) REFERENCES public.directus_files(id);


--
-- Name: directus_settings directus_settings_public_registration_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_public_registration_role_foreign FOREIGN KEY (public_registration_role) REFERENCES public.directus_roles(id) ON DELETE SET NULL;


--
-- Name: directus_settings directus_settings_storage_default_folder_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_settings
    ADD CONSTRAINT directus_settings_storage_default_folder_foreign FOREIGN KEY (storage_default_folder) REFERENCES public.directus_folders(id) ON DELETE SET NULL;


--
-- Name: directus_shares directus_shares_collection_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_collection_foreign FOREIGN KEY (collection) REFERENCES public.directus_collections(collection) ON DELETE CASCADE;


--
-- Name: directus_shares directus_shares_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE CASCADE;


--
-- Name: directus_shares directus_shares_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_shares
    ADD CONSTRAINT directus_shares_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_users directus_users_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_users
    ADD CONSTRAINT directus_users_role_foreign FOREIGN KEY (role) REFERENCES public.directus_roles(id) ON DELETE SET NULL;


--
-- Name: directus_versions directus_versions_collection_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_collection_foreign FOREIGN KEY (collection) REFERENCES public.directus_collections(collection) ON DELETE CASCADE;


--
-- Name: directus_versions directus_versions_user_created_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_user_created_foreign FOREIGN KEY (user_created) REFERENCES public.directus_users(id) ON DELETE SET NULL;


--
-- Name: directus_versions directus_versions_user_updated_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.directus_versions
    ADD CONSTRAINT directus_versions_user_updated_foreign FOREIGN KEY (user_updated) REFERENCES public.directus_users(id);


--
-- Name: home_settings_files home_settings_files_directus_files_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.home_settings_files
    ADD CONSTRAINT home_settings_files_directus_files_id_foreign FOREIGN KEY (directus_files_id) REFERENCES public.directus_files(id) ON DELETE CASCADE;


--
-- Name: home_settings_files home_settings_files_home_settings_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.home_settings_files
    ADD CONSTRAINT home_settings_files_home_settings_id_foreign FOREIGN KEY (home_settings_id) REFERENCES public.home_settings(id) ON DELETE CASCADE;


--
-- Name: mediations mediations_image_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.mediations
    ADD CONSTRAINT mediations_image_foreign FOREIGN KEY (image) REFERENCES public.directus_files(id) ON DELETE SET NULL;


--
-- Name: mediations mediations_video_foreign; Type: FK CONSTRAINT; Schema: public; Owner: directus
--

ALTER TABLE ONLY public.mediations
    ADD CONSTRAINT mediations_video_foreign FOREIGN KEY (video) REFERENCES public.directus_files(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict dTg2qrP3BLu5Yya8S6xL73P4lfqYfJr8Ufd4gBdyjYPXl0gVKRBB5IoIE7Quq2f

