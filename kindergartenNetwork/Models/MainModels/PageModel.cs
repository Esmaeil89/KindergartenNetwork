using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace kindergartenNetwork.Models.MainModels
{
    public class PageModel
    {
        public List<Page> LstParent { get; set; } 
    }

    public class InsertUpdatePageModle
    {
        public InsertUpdatePageModle()
        {
            LstPageCategory = new List<PagesCategory>();
            LstParent = new List<Page>();
        }
        public Page OPage { get; set; }
        public List<PagesCategory> LstPageCategory { get; set; }
        public List<Page> LstParent { get; set; }  
    }
}