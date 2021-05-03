﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace kindergartenNetwork.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class kindergartenNetworkEntities : DbContext
    {
        public kindergartenNetworkEntities()
            : base("name=kindergartenNetworkEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AppSetting> AppSettings { get; set; }
        public virtual DbSet<Attachment> Attachments { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Constant> Constants { get; set; }
        public virtual DbSet<ContactU> ContactUs { get; set; }
        public virtual DbSet<Destination> Destinations { get; set; }
        public virtual DbSet<ErrorsLog> ErrorsLogs { get; set; }
        public virtual DbSet<ImportantLink> ImportantLinks { get; set; }
        public virtual DbSet<Medium> Media { get; set; }
        public virtual DbSet<MediaAlbum> MediaAlbums { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<NewskeyWord> NewskeyWords { get; set; }
        public virtual DbSet<Page> Pages { get; set; }
        public virtual DbSet<PagesCategory> PagesCategories { get; set; }
        public virtual DbSet<SocialNW> SocialNWs { get; set; }
        public virtual DbSet<StaticPage> StaticPages { get; set; }
        public virtual DbSet<UserAccount> UserAccounts { get; set; }
        public virtual DbSet<UserType> UserTypes { get; set; }
        public virtual DbSet<UserTypePage> UserTypePages { get; set; }
        public virtual DbSet<WorkTeam> WorkTeams { get; set; }
    }
}