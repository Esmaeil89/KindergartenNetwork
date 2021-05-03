using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace kindergartenNetwork.Models.NewsModels
{
    public class NewsModel
    {
        public NewsModel()
        {
            LstCategory = new List<Category>();
            LstUsers = new List<UserAccount>();
            ONews = new News();
            OCategory =new Category();
        }
        public List<Category> LstCategory { get; set; }
        public List<UserAccount> LstUsers { get; set; }
        public News ONews { get; set; }
        public Category OCategory { get; set; }
    }
    public class CategoryModel
    {
        public Category OCategory { get; set; }
    }
}