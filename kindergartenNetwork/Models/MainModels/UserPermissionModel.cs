using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace kindergartenNetwork.Models.MainModels
{
    public class UserPermissionModel
    {
        public UserPermissionModel()
        {
            LstUserTypes = new List<UserType>();
            LstPages = new List<Page>();
        }
        public List<UserType> LstUserTypes { get; set; }
        public List<Page> LstPages { get; set; }
    }
}