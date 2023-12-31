PGDMP         ,                {            freelas    15.3    15.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24643    freelas    DATABASE     ~   CREATE DATABASE freelas WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE freelas;
                postgres    false            �            1259    24668    services    TABLE     �   CREATE TABLE public.services (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "idUser" integer NOT NULL,
    photo character varying NOT NULL,
    description text NOT NULL,
    active boolean NOT NULL
);
    DROP TABLE public.services;
       public         heap    postgres    false            �            1259    24667    services_id_seq    SEQUENCE     �   CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.services_id_seq;
       public          postgres    false    217            	           0    0    services_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;
          public          postgres    false    216            �            1259    24645    users    TABLE     0  CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    token character varying(255),
    name character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    phone character varying(20) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24644    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    215            
           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    214            k           2604    24671    services id    DEFAULT     j   ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);
 :   ALTER TABLE public.services ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            j           2604    24648    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215                      0    24668    services 
   TABLE DATA           R   COPY public.services (id, name, "idUser", photo, description, active) FROM stdin;
    public          postgres    false    217   K                  0    24645    users 
   TABLE DATA           N   COPY public.users (id, email, password, token, name, city, phone) FROM stdin;
    public          postgres    false    215   h                  0    0    services_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.services_id_seq', 1, false);
          public          postgres    false    216                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    214            o           2606    24675    services services_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.services DROP CONSTRAINT services_pkey;
       public            postgres    false    217            m           2606    24652    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            p           2606    24676    services services_idUser_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.services
    ADD CONSTRAINT "services_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES public.users(id);
 I   ALTER TABLE ONLY public.services DROP CONSTRAINT "services_idUser_fkey";
       public          postgres    false    3181    217    215                  x������ � �             x������ � �     