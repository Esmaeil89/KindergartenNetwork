 using System;
using System.Collections.Generic;
 using System.Data.Entity;
 using System.Data.SqlClient;
 using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
 using System.Web.UI.WebControls;
 using EntityFrameworkPaginate;
 using kindergartenNetwork.Helper;
using kindergartenNetwork.Models.DataTableModels;
using Newtonsoft.Json;
using kindergartenNetwork.Models;
 using kindergartenNetwork.Controllers;
 using kindergartenNetwork.Models.MainModels;
 using Microsoft.Ajax.Utilities;


 namespace kindergartenNetwork.Controllers
{
    public class ManagementController : BaseController
    {
        private static kindergartenNetworkEntities _db = new kindergartenNetworkEntities();
        // GET: Management
        //public ActionResult Index()
        //{
        //    return View();
        //}
        #region Constant
        public ActionResult Constant()
        {
            var oModel = new ConstantModel();
            var getParentConstant = _db.Constants.Where(x=>x.ParentId == 0 && x.IsDeleted == false ).ToList();
            if (getParentConstant.Count > 0)
            {
                oModel.LstConstants = getParentConstant;
            }
            return View(oModel);
        }
        public JsonResult GetConstantDataTable(JQueryDataTableParamModel param)
        {
            #region byDefaultReturnData

            int rowCount = 0;
            int lnRowCount = 0;
            var result = from q in new List<Constant>()
                         select new
                         {
                             q.Id,
                             ConstantName = q.NameAr,
                             ParentName = q.Parent.NameAr,
                             q.ParentId,
                             q.Comment,
                             q.Icon
                         };

            #endregion
            var oConstant = new Constant();


            if (!string.IsNullOrEmpty(Request.QueryString["ConstantId"]))
                oConstant.Id = Convert.ToInt32(Request.QueryString["ConstantId"]);
            if (!string.IsNullOrEmpty(Request.QueryString["ParentId"]))
                oConstant.ParentId = Convert.ToInt32(Request.QueryString["ParentId"]);

            DataTableProcessModel m = new DataTableProcessModel();
            DataTableProcessModel dtProcess = DataTableProcesses.DataTableEslestir(param, m);
            //oConstant.SortCol = dtProcess.SortCol;
            //oConstant.SortType = dtProcess.SortType;
            //oConstant.Page = dtProcess.Page;
            //oConstant.RowPerPage = dtProcess.RowPerPage;
            var filters = new Filters<Constant>();
            filters.Add(oConstant.Id > 0, x => x.Id == oConstant.Id);
            filters.Add(oConstant.ParentId > 0, x => x.ParentId == oConstant.ParentId);
            filters.Add(true, x => x.IsDeleted == false);

            var sorts = new Sorts<Constant>();
            sorts.Add(dtProcess.SortCol == "Id", x => x.Id);
            sorts.Add(dtProcess.SortCol == "NameAr", x => x.NameAr);
            sorts.Add(dtProcess.SortCol == "parentId", x => x.ParentId);

            var getConstant = _db.Constants.Paginate(dtProcess.Page, dtProcess.RowPerPage, sorts, filters);

            if (getConstant.RecordCount >0)
            {
                var getConstantResult = getConstant.Results.ToList();
                foreach (var constant in getConstantResult)
                {
                    constant.Parent = getConstantResult.FirstOrDefault(x => x.Id == constant.ParentId);
                }
                rowCount = getConstant.RecordCount;
                lnRowCount = rowCount;

                result = from q in getConstantResult
                         select new
                         {
                             q.Id,
                             ConstantName = q.NameAr,
                             ParentName = q.Parent?.NameAr,
                             q.ParentId,
                             q.Comment,
                             q.Icon
                         };

            }
            return Json(new
            {
                param.sEcho,
                iTotalRecords = rowCount,
                iTotalDisplayRecords = lnRowCount,
                aaData = result
            },
                JsonRequestBehavior.AllowGet);
        }
        public PartialViewResult InsertConstantModal()
        {
            var oModel = new ConstantModel();
            var getParentConstant = _db.Constants.Where(x=>x.ParentId == 0 && x.IsDeleted == false ).ToList();
            if (getParentConstant.Count > 0)
            {
                oModel.LstConstants = getParentConstant;
            }
            return PartialView("ConstantParts/_ConstantInsertModal", oModel);
        }
        public PartialViewResult UpdateConstantModal(string id)
        {
            var constantId = Convert.ToInt32(id);
            var oModel = new UpdateConstantModel();
            var getParentConstant = _db.Constants.Where(x=>x.ParentId == 0 && x.IsDeleted == false).ToList();
            if (getParentConstant.Count > 0)
            {
                oModel.LstConstants = getParentConstant;
            }
            if (constantId > 0)
            {
                var getConstant = _db.Constants.Where(x=> x.Id == constantId ).ToList();
                if (getConstant.Count > 0)
                    oModel.OConstant = getConstant.FirstOrDefault();
            }
            return PartialView("ConstantParts/_ConstantUpdateModal", oModel);
        }
        public JsonResult InsertConstant([Bind(Exclude = "Id")] Constant oConstant)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            if (ModelState.IsValid)
            {
                var oUserTypeInsert = _db.Constants.Add(oConstant);
                if (oUserTypeInsert.Id > 0)
                {
                    cStatus = "success";
                    cMsg = Resources.NotifyMsg.InsertSuccessMsg;
                    return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { cStatus = "notValid", cMsg = Resources.NotifyMsg.NotValidMsg }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateConstant(Constant oConstant)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            if (ModelState.IsValid)
            {
                var constant = _db.Constants.FirstOrDefault(x => x.Id == oConstant.Id);
                if (constant != null) {

                    _db.Constants.Attach(constant);
                    constant.NameAr = oConstant.NameAr;
                    constant.NameEn = oConstant.NameEn;
                    constant.Icon = oConstant.Icon;
                    constant.ParentId = oConstant.ParentId;
                    constant.Comment = oConstant.Comment;
                    _db.Entry(constant).Property(x => x.NameAr).IsModified = true;
                    _db.Entry(constant).Property(x => x.NameEn).IsModified = true;
                    _db.Entry(constant).Property(x => x.Icon).IsModified = true;
                    _db.Entry(constant).Property(x => x.ParentId).IsModified = true;
                    _db.Entry(constant).Property(x => x.Comment).IsModified = true;

                    _db.SaveChanges();
                    cStatus = "success";
                    cMsg = Resources.NotifyMsg.UpdateSuccessMsg;
                }
                return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                cStatus = "notValid";
                cMsg = Resources.NotifyMsg.NotValidMsg;
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteConstant(int id)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            var oConstant = new Constant();
            oConstant.Id = Convert.ToInt32(id);

            var constant = _db.Constants.First(x => x.Id == oConstant.Id);
            if (constant != null)
            {
                _db.Constants.Attach(constant);
                constant.IsDeleted = true;
                _db.Entry(constant).Property(x => x.IsDeleted).IsModified = true; 
                _db.SaveChanges();
                cStatus = "success";
                cMsg = Resources.NotifyMsg.DeleteSuccessMsg;
            }

            return Json(new {cStatus, cMsg}, JsonRequestBehavior.AllowGet);

        }
        public JsonResult ConstantSearchAutoComplete(string id)
        {
            var getConstantResult = new List<Constant>();
            var getConstant =
                _db.Constants.Where(x => x.NameAr.Contains(id.Trim())).ToList();

            if (getConstant.Count > 0)
            {
                getConstantResult = getConstant;
                var result = from q in getConstantResult
                             select new
                             {
                                 Name = q.NameAr,
                                 q.Id
                             };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(getConstantResult, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Users
        public ActionResult Users()
        {
            var oModel = new UserModel();

            var getLstType = _db.UserTypes.Where(x=>x.IsDeleted == false).ToList();
            if (getLstType.Count > 0)
            {
                oModel.LstUserTypes = User.UserTypeId == 1 ? getLstType : getLstType.Where(x => x.Id != 1).ToList();
            }

            return View(oModel);
        }
        public PartialViewResult InsertUsersModal()
        {
            var oModel = new UserModel();
            var getLstType = _db.UserTypes.Where(x => x.IsDeleted == false).ToList();
            if (getLstType.Count > 0)
            {
                oModel.LstUserTypes = User.UserTypeId == 1 ? getLstType : getLstType.Where(x => x.Id != 1).ToList();
            }

            return PartialView("UserParts/_UserInsertModal", oModel);
        }
        public PartialViewResult UpdateUsersModal(string id)
        {
            var usertId = Convert.ToInt32(id);
            var oModel = new InsertUpdateUserModel();
            var getLstType = _db.UserTypes.Where(x => x.IsDeleted == false).ToList();
            if (getLstType.Count > 0)
            {
                oModel.LstUserTypes = User.UserTypeId == 1 ? getLstType : getLstType.Where(x => x.Id != 1).ToList();
            }

            if (usertId > 0)
            {
                var getUser = _db.UserAccounts.Where(x=>x.Id == usertId).ToList();
                if (getUser.Count > 0)
                    oModel.OUserAccounts = getUser.FirstOrDefault();
            }

            return PartialView("UserParts/_UserUpdateModal", oModel);
        }
        public JsonResult GetUserDataTable(JQueryDataTableParamModel param)
        {
            #region byDefaultReturnData

            int rowCount = 0;
            int lnRowCount = 0;
            var result = from q in new List<UserAccount>()
                         select new
                         {
                             q.Id,
                             q.Name,
                             q.IsActive,
                             UserTypeName = q.UserType.Name,
                             q.Email,
                             q.Avatar,
                             q.Mobile,
                             q.Gender
                         };

            #endregion
            var oUser = new UserAccount();

            if (!string.IsNullOrEmpty(Request.QueryString["Name"]))
                oUser.Name = Request.QueryString["Name"];
            if (!string.IsNullOrEmpty(Request.QueryString["UserTypeId"]))
                oUser.UserTypeId = Convert.ToInt32(Request.QueryString["UserTypeId"]);

            DataTableProcessModel m = new DataTableProcessModel();
            DataTableProcessModel dtProcess = DataTableProcesses.DataTableEslestir(param, m);
            //oUser.SortCol = dtProcess.SortCol;
            //oUser.SortType = dtProcess.SortType;
            //oUser.Page = dtProcess.Page;
            //oUser.RowPerPage = dtProcess.RowPerPage;
            //var getUsers = DAL.Account.UserAccounts.UserAccountGet(oUser);

            var filters = new Filters<UserAccount>();
            filters.Add(Convert.ToBoolean(oUser.Name), x => x.Name == oUser.Name);
            filters.Add(oUser.UserTypeId > 0, x => x.UserTypeId == oUser.UserTypeId);
            filters.Add(User.UserTypeId != 1, x => x.UserTypeId > 1);
            filters.Add(true, x => x.IsDeleted == false);

            var sorts = new Sorts<UserAccount>();
            sorts.Add(dtProcess.SortCol == "Name", x => x.Name);
            sorts.Add(dtProcess.SortCol == "Id", x => x.Id);

            var getUsers = _db.UserAccounts.Include(x=>x.UserType).Paginate(dtProcess.Page, dtProcess.RowPerPage, sorts, filters);


            if (getUsers.RecordCount > 0)
            {
                var getUsersResult = getUsers.Results;

                rowCount = getUsers.RecordCount;
                lnRowCount = rowCount;

                result = from q in getUsersResult
                         select new
                         {
                             q.Id,
                             q.Name,
                             q.IsActive,
                             UserTypeName = q.UserType.Name,
                             q.Email,
                             q.Avatar,
                             q.Mobile,
                             q.Gender

                         };

            }
            return Json(new
            {
                param.sEcho,
                iTotalRecords = rowCount,
                iTotalDisplayRecords = lnRowCount,
                aaData = result
            },
                JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertUser([Bind(Exclude = "Id")] UserAccount oUserAccounts)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            if (ModelState.IsValid)
            {
                var oUserInsert = _db.UserAccounts.Add(oUserAccounts);
                if (oUserInsert.Id > 0)
                {
                    cStatus = "success";
                    cMsg = Resources.NotifyMsg.InsertSuccessMsg;
                    var id = oUserInsert.Id;
                    return Json(new { cStatus, cMsg, id }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { cStatus = "notValid", cMsg = Resources.NotifyMsg.NotValidMsg }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateUser(UserAccount oUserAccount)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            if (ModelState.IsValid)
            {
                var user = _db.UserAccounts.FirstOrDefault(x => x.Id == oUserAccount.Id);
                if (user != null)
                {

                    _db.UserAccounts.Attach(user);
                    user.Name = oUserAccount.Name;
                    user.UserTypeId = oUserAccount.UserTypeId;
                    user.Avatar = oUserAccount.Avatar;
                    user.Email = oUserAccount.Email;
                    if (!string.IsNullOrEmpty(oUserAccount.Pass))
                    {
                        user.EmailPassword = Models.Common.Common.Md5(oUserAccount.Pass);
                        user.Pass = Models.Common.Common.Md5(oUserAccount.Pass);
                    }

                    user.Gender = oUserAccount.Gender;
                    user.IsActive = oUserAccount.IsActive;
                    user.ManagerGroupId = oUserAccount.ManagerGroupId;
                    user.Mobile = oUserAccount.Mobile;
                    _db.Entry(user).Property(x => x.Name).IsModified = true;
                    _db.Entry(user).Property(x => x.UserTypeId).IsModified = true;
                    _db.Entry(user).Property(x => x.Avatar).IsModified = true;
                    _db.Entry(user).Property(x => x.Email).IsModified = true;
                    if (!string.IsNullOrEmpty(oUserAccount.Pass))
                    {
                        _db.Entry(user).Property(x => x.EmailPassword).IsModified = true;
                        _db.Entry(user).Property(x => x.Pass).IsModified = true;
                    }

                    _db.Entry(user).Property(x => x.Gender).IsModified = true;
                    _db.Entry(user).Property(x => x.IsActive).IsModified = true;
                    _db.Entry(user).Property(x => x.ManagerGroupId).IsModified = true;
                    _db.Entry(user).Property(x => x.Mobile).IsModified = true;

                    _db.SaveChanges();
                    cStatus = "success";
                    cMsg = Resources.NotifyMsg.UpdateSuccessMsg;
                    return Json(new {cStatus, cMsg}, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { cStatus = "notValid", cMsg = Resources.NotifyMsg.NotValidMsg }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UploadUserImg()
        {
            var fileName = "";
            var file = Request.Files[0];
            //var LogInUser = new UserAccounts();
            //var OUserType = new UserAccounts();

            if (file != null && file.ContentLength > 0)
            {
                //imageName = Path.GetFileNameWithoutExtension(file.FileName);
                fileName = Path.GetFileName(file.FileName);
                string ext = fileName?.Split('.')[fileName.Split('.').Length - 1];
                string n = Guid.NewGuid().ToString();
                fileName = n + "." + ext;
                var path = Path.Combine(Server.MapPath("/Content/UploadedFile/Avatar/Original/"), fileName);
                file.SaveAs(path);


                var thumbPath = Path.Combine(Server.MapPath("/Content/UploadedFile/Avatar/Thumbnail/"), fileName);
                var largePath = Path.Combine(Server.MapPath("/Content/UploadedFile/Avatar/Large/"), fileName);
                GeneralHelper.ResizeImage(path, thumbPath, 250, ext, true);
                GeneralHelper.ResizeImage(path, largePath, 950, ext, false);
                //OUserType.Id = User.Id;
                //OUserType.Avatar = User.Avatar;
                //var oResult = DAL.Account.UserAccounts.UserAccountGet(OUserType);
                //LogInUser = ((List<DTO.Account.UserAccounts>) oResult.Results).FirstOrDefault();
                //CustomPrincipalSerializeModel serializeModel = new CustomPrincipalSerializeModel();
                //serializeModel.Id = LogInUser.Id;
                //serializeModel.Name = LogInUser.Name;
                ////serializeModel.UserTypeId = LogInUser.UserTypeId.Value;
                //serializeModel.Email = LogInUser.Email;
                //serializeModel.Avatar = LogInUser.Avatar;
                ////serializeModel.UserTypeName = LogInUser.UserTypeName;
                //serializeModel.IsActive = LogInUser.IsActive.Value;
                //serializeModel.IsDeleted = LogInUser.IsDeleted;
                //serializeModel.Gender = LogInUser.Gender;
                //serializeModel.Mobile = LogInUser.Mobile;

                //string userData = JsonConvert.SerializeObject(serializeModel);
                //HttpCookie cookie = FormsAuthentication.GetAuthCookie(LogInUser.Name, false);
                //var ticket = FormsAuthentication.Decrypt(cookie.Value);
                //var newticket = new FormsAuthenticationTicket(ticket.Version,
                //    ticket.Name,
                //    ticket.IssueDate,
                //    ticket.Expiration,
                //    true,
                //    userData,
                //    ticket.CookiePath);

                //cookie.Value = FormsAuthentication.Encrypt(newticket);
                ////cookie.Expires = newticket.Expiration.AddHours(24);
                //HttpContext.Response.Cookies.Set(cookie);
            }

            return Json(new
            {
                result = "success",
                Filename = fileName,
            },
                   JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteUserAccount(int id)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            var oUser = new UserAccount();
            oUser.Id = Convert.ToInt32(id);

            var user = _db.UserAccounts.FirstOrDefault(x => x.Id == oUser.Id);
            if (user != null)
            {

                _db.UserAccounts.Attach(user);
                user.IsDeleted = true;
                _db.Entry(user).Property(x => x.IsDeleted).IsModified = true;

                _db.SaveChanges();
                cStatus = "success";
                cMsg = Resources.NotifyMsg.DeleteSuccessMsg;
            }
            return Json(new { cStatus, cMsg, }, JsonRequestBehavior.AllowGet);

        }

        public PartialViewResult MyProfileModal()
        {

            var oModel = new ProfileModel();

            if (User.Id > 0)
            {
                oModel.OUserProfile.Id = User.Id;
                var getUser = _db.UserAccounts.First(x=>x.Id == oModel.OUserProfile.Id);
                if (getUser != null)
                    oModel.OUserProfile = new UserProfile
                    {
                        Name = getUser.Name,
                        Email = getUser.Email,
                        CurrentPassword = getUser.Pass,
                        Mobile = getUser.Mobile,
                        Gender = getUser.Gender,
                        Avatar = getUser.Avatar
                    };
            }

            return PartialView("UserParts/_UserProfileModel", oModel);
        }
        public JsonResult UpdateMyProfile([Bind(Exclude = "UserTypeId,IsActive,IsDeleted,EmailPassword,TraceUserActivity,Pass")] UserAccount oUser)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            if (ModelState.IsValid)
            {
                var user = _db.UserAccounts.FirstOrDefault(x => x.Id == oUser.Id);
                if (user != null)
                {

                    _db.UserAccounts.Attach(user);
                    user.Name = oUser.Name;
                    user.Avatar = oUser.Avatar;
                    user.Email = oUser.Email;
                    user.EmailPassword = Models.Common.Common.Md5(oUser.Pass);
                    user.Pass = Models.Common.Common.Md5(oUser.Pass);
                    user.Gender = oUser.Gender;
                    user.Mobile = oUser.Mobile;
                    _db.Entry(oUser).Property(x => x.Name).IsModified = true;
                    _db.Entry(oUser).Property(x => x.Avatar).IsModified = true;
                    _db.Entry(oUser).Property(x => x.Email).IsModified = true;
                    _db.Entry(oUser).Property(x => x.EmailPassword).IsModified = true;
                    _db.Entry(oUser).Property(x => x.Pass).IsModified = true;
                    _db.Entry(oUser).Property(x => x.Gender).IsModified = true;
                    _db.Entry(oUser).Property(x => x.Mobile).IsModified = true;

                    _db.SaveChanges();
                    cStatus = "success";
                    cMsg = Resources.NotifyMsg.UpdateSuccessMsg;
                    return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { cStatus = "notValid", cMsg = Resources.NotifyMsg.NotValidMsg }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }
        public PartialViewResult ChangePasswordModal()
        {
            return PartialView("UserParts/_ChangePasswordModel");
        }
        public JsonResult UpdatePassword([Bind(Include = "CurrentPassword,NewPassword,ConfirmPassword")] UserProfile oUserProfile)
        {
            string cStatus;
            string cMsg;
            string oldPass = oUserProfile.CurrentPassword;
            string newPass = oUserProfile.NewPassword;
            //string confirmPass = oUserProfile.ConfirmPassword;
            int tryNo = oUserProfile.tryNo;
            if (tryNo < 4)
            {
                string encrpOldPass = Models.Common.Common.Md5(oldPass);
                if (User.Password == encrpOldPass)
                {
                    var oUser = new UserAccount();
                    oUser.Id = oUserProfile.Id;
                    var user = _db.UserAccounts.First(x => x.Id == oUser.Id);

                    _db.UserAccounts.Attach(user);
                    user.Pass = Models.Common.Common.Md5(oUser.Pass);
                    _db.Entry(user).Property(x => x.Pass).IsModified = true;

                    _db.SaveChanges();
                    cStatus = "success";
                    cMsg = Resources.NotifyMsg.UpdateSuccessMsg;
                    return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
                    
                }
                else
                {
                    cStatus = "notValid";
                    cMsg = Resources.NotifyMsg.ErrorIncorrect;
                    return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
                }

            }
            else
            {
                FormsAuthentication.SignOut();
                return Json(new
                {
                    cStatus = "error",
                    cMsg = Resources.NotifyMsg.ErrorPass,
                    isRedirect = true,
                    redirectUrl = Url.Action("LoginRedirect", "Login")
                }, JsonRequestBehavior.AllowGet);
            }

        }

        #endregion

        #region UserTypes
        public ActionResult UserTypes()
        {
            return View();
        }
        public PartialViewResult UserTypePartial(int? id)
        {

            var oModel = new UserTypeModel();
            if (id != 0)
            {
                oModel.OUserType.Id = Convert.ToInt32(id);

                if (oModel.OUserType.Id > 0){
                    var oResult = _db.UserTypes.First(x=>x.Id == oModel.OUserType.Id);
                    if (oResult != null)
                    {
                        oModel.OUserType = oResult;
                    }
                    else
                        Response.Redirect("/Error/Error");
                }
            }
            else
                oModel.OUserType = new UserType();
            return PartialView("UserParts/_UserAddEditType", oModel);
        }
        public JsonResult AddEditUserType(UserType oUserType)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;

            if (!string.IsNullOrEmpty(oUserType.Name))
            {
                if (oUserType.Id == 0)
                {
                    var oResult = _db.UserTypes.Add(oUserType);
                    if (oResult.Id > 0)
                    {
                        cStatus = "success";
                        cMsg = Resources.NotifyMsg.InsertSuccessMsg;
                    }
                }
                else
                {
                    var useType = _db.UserTypes.First(x => x.Id == oUserType.Id);
                    if (useType != null)
                    {
                        _db.UserTypes.Attach(useType);
                        useType.Name = oUserType.Name;
                        _db.Entry(useType).Property(x => x.Name).IsModified = true;

                        _db.SaveChanges();
                        cStatus = "success";
                        cMsg = Resources.NotifyMsg.InsertSuccessMsg;
                        return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            return Json(new { cStatus, cMsg, }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteUserType(int id)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            var oUserType = new UserType();
            oUserType.Id = Convert.ToInt32(id);

            var useType = _db.UserTypes.First(x => x.Id == oUserType.Id);
            if (useType != null)
            {
                _db.UserTypes.Attach(useType);
                useType.IsDeleted = true;
                _db.Entry(useType).Property(x => x.IsDeleted).IsModified = true;

                _db.SaveChanges();
                cStatus = "success";
                cMsg = Resources.NotifyMsg.DeleteSuccessMsg;
            }
            return Json(new { cStatus, cMsg, }, JsonRequestBehavior.AllowGet);

        }

        public JsonResult UserTypeTableAjax(JQueryDataTableParamModel param)
        {
            #region byDefaultReturnData

            int rowCount = 0;
            int lnRowCount = 0;
            var result = from q in new List<UserType>()
                         select new
                         {
                             q.Id,
                             q.Name
                         };

            #endregion
            var oUserType = new UserType();
            if (!string.IsNullOrEmpty(Request.QueryString["Name"]))
            {
                oUserType.Name = Request.QueryString["Name"];
            }

            DataTableProcessModel m = new DataTableProcessModel();
            DataTableProcessModel dtProcess = DataTableProcesses.DataTableEslestir(param, m);
            //oUserType.SortCol = dtProcess.SortCol;
            //oUserType.SortType = dtProcess.SortType;
            //oUserType.Page = dtProcess.Page;
            //oUserType.RowPerPage = dtProcess.RowPerPage;
            //var oResultModel = DAL.Account.UserType.GetUserType(oUserType);

            var filters = new Filters<UserType>();
            //filters.Add(Convert.ToBoolean(oUserType.Name), x => x.Name == oUserType.Name);
            filters.Add(true, x => x.IsDeleted == false);

            var sorts = new Sorts<UserType>();
            sorts.Add(dtProcess.SortCol == "Id", x => x.Name);

            var getUsers = _db.UserTypes.Paginate(dtProcess.Page, dtProcess.RowPerPage, sorts, filters);

            if (getUsers.RecordCount > 0)
            {
                var lstUserType = getUsers.Results;

                rowCount = getUsers.RecordCount;
                lnRowCount = rowCount;

                result = from q in lstUserType
                         select new
                         {
                             q.Id,
                             q.Name
                         };

            }
            return Json(new
            {
                param.sEcho,
                iTotalRecords = rowCount,
                iTotalDisplayRecords = lnRowCount,
                aaData = result

            },
                JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region UserPermission
        public ActionResult UserPermission()
        {
            var oModel = new UserPermissionModel();

            var oResult = _db.UserTypes.Where(x => x.IsDeleted == false).ToList();
            if (oResult.Count > 0)
            {
                oModel.LstUserTypes = User.UserTypeId == 1 ? oResult : oResult.Where(x => x.Id != 1).ToList();
            }

            var oUserTypePages = new UserTypePage();
            oUserTypePages.UserTypeId = User.UserTypeId;
            oModel.LstPages = _db.Pages.ToList();

            var query = (
                from userPage in _db.UserTypePages
                join page in _db.Pages on userPage.PageId equals page.Id
                select new
                {
                    userPage.UserTypeId,
                    page.Id,
                    page.Name,
                    page.Link,
                    page.ParentId,
                    page.OrderId,
                    page.InMenu,
                    page.ForAdmin,
                    page.NeedLogin,
                    page.IsActive,
                    page.Icon,
                    page.TypeId
                }).Where(x => x.UserTypeId == User.UserTypeId).ToList();
            var lstPages = new List<Page>();
            if (query.Count > 0)
            {
                for (int i = 0; i < query.Count; i++)
                {
                    var page = new Page
                    {
                        Id = query[i].Id,
                        Name = query[i].Name,
                        Link = query[i].Link,
                        ParentId = query[i].ParentId,
                        OrderId = query[i].OrderId,
                        InMenu = query[i].InMenu,
                        ForAdmin = query[i].ForAdmin,
                        NeedLogin = query[i].NeedLogin,
                        IsActive = query[i].IsActive,
                        Icon = query[i].Icon,
                        TypeId = query[i].TypeId
                    };
                    lstPages.Add(page);
                }
            }
            var oResulPages = lstPages;

            if (oResulPages.Count > 0)
            {
                oModel.LstPages = oResulPages;
            }
            return View(oModel);
        }
        public JsonResult GetUserTypePermission(string id)
        {
            var cResult = "Error";
            var cMessage = "something wrong!";

            var lstPages = new List<Page>();
            if (!string.IsNullOrEmpty(id))
            {
                int oUserTypeId = Convert.ToInt32(id);
                var oUserTypePages = new UserTypePage();
                oUserTypePages.UserTypeId = oUserTypeId;
                var oPages = new Page();

                var query = (
                    from userPage in _db.UserTypePages
                    join page in _db.Pages on userPage.PageId equals page.Id
                    select new
                    {
                        userPage.UserTypeId,
                        page.Id,
                        page.Name,
                        page.Link,
                        page.ParentId,
                        page.OrderId,
                        page.InMenu,
                        page.ForAdmin,
                        page.NeedLogin,
                        page.IsActive,
                        page.Icon,
                        page.TypeId
                    }).Where(x => x.UserTypeId == oUserTypeId).ToList();
                if (query.Count > 0)
                {
                    for (int i = 0; i < query.Count; i++)
                    {
                        var page = new Page
                        {
                            Id = query[i].Id,
                            Name = query[i].Name,
                            Link = query[i].Link,
                            ParentId = query[i].ParentId,
                            OrderId = query[i].OrderId,
                            InMenu = query[i].InMenu,
                            ForAdmin = query[i].ForAdmin,
                            NeedLogin = query[i].NeedLogin,
                            IsActive = query[i].IsActive,
                            Icon = query[i].Icon,
                            TypeId = query[i].TypeId
                        };
                        lstPages.Add(page);
                    }
                }
                var oResulPages = lstPages;
                if (oResulPages.Count > 0)
                {
                    lstPages = oResulPages;
                    cResult = "OK";
                    cMessage = "Successfuly";
                }

            }

            return Json(new
            {
                cResult,
                cMessage,
                lstPages
            },
            JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveUserPermission(int userTypeId, string pages)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            var lstPagesIds = pages.TrimEnd(',').Split(',');
            using (var context = new kindergartenNetworkEntities())
            {
                // delete existing records
                context.Database.ExecuteSqlCommand("DELETE FROM UserTypePages WHERE UserTypeId = @UserTypeId", new SqlParameter("@UserTypeId",userTypeId));
                var x = context.Database.SqlQuery<kindergartenNetworkEntities>("SP_UserTypePagesAdd", new SqlParameter("@UserTypeId", userTypeId), new SqlParameter("@PageId", pages));
            }
            //var lstUserPages = new List<UserTypePage>();
            //foreach (var t in lstPagesIds)
            //{
            //    var utp = new UserTypePage {PageId = Convert.ToInt32(t), UserTypeId = userTypeId};
            //    db.UserTypePages.Add(utp);
            //}
            cStatus = "success";
            cMsg = Resources.NotifyMsg.SuccessMsg;

            return Json(new
            {
                cStatus,
                cMsg
            },
            JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Pages
        public ActionResult Pages()
        {
            var oModel = new PageModel();

            var getLstType = _db.Pages.Where(x => x.TypeId != 3).ToList();
            if (getLstType.Count > 0)
                oModel.LstParent = getLstType;
            return View(oModel);
        }
        public JsonResult GetPagesDataTable(JQueryDataTableParamModel param)
        {
            #region byDefaultReturnData

            int rowCount = 0;
            int lnRowCount = 0;
            var result = from q in new List<Page>()
                         select new
                         {
                             q.Id,
                             q.Name,
                             q.IsActive,
                             ParentName = q.Parent.Name,
                             q.Link,
                             q.Icon
                         };

            #endregion
            var oPage = new Page();

            if (!string.IsNullOrEmpty(Request.QueryString["PageId"]))
                oPage.Id = Convert.ToInt32(Request.QueryString["PageId"]);
            if (!string.IsNullOrEmpty(Request.QueryString["ParentId"]))
                oPage.ParentId = Convert.ToInt32(Request.QueryString["ParentId"]);

            DataTableProcessModel m = new DataTableProcessModel();
            DataTableProcessModel dtProcess = DataTableProcesses.DataTableEslestir(param, m);
            //oPages.SortCol = dtProcess.SortCol;
            //oPages.SortType = dtProcess.SortType;
            //oPages.Page = dtProcess.Page;
            //oPages.RowPerPage = dtProcess.RowPerPage;
            //var getPages = DAL.Account.Pages.PagesGet(oPages, false);

            var filters = new Filters<Page>();
            filters.Add(oPage.Id > 0, x => x.Id == oPage.Id);
            filters.Add(oPage.ParentId > 0, x => x.ParentId == oPage.ParentId);
            filters.Add(true, x => x.IsDeleted == false);

            var sorts = new Sorts<Page>();
            sorts.Add(dtProcess.SortCol == "Id", x => x.Id);
            sorts.Add(dtProcess.SortCol == "Name", x => x.Name);
            sorts.Add(dtProcess.SortCol == "parentId", x => x.ParentId);

            var getPages = _db.Pages.Paginate(dtProcess.Page, dtProcess.RowPerPage, sorts, filters);

            if (getPages.RecordCount > 0)
            {
                var getPagesResult = getPages.Results.ToList();
                foreach (var page in getPagesResult)
                {
                    page.Parent = getPagesResult.FirstOrDefault(x => x.Id == page.ParentId);
                }
                rowCount = getPages.RecordCount;
                lnRowCount = rowCount;

                result = from q in getPagesResult
                         select new
                         {
                             q.Id,
                             q.Name,
                             q.IsActive,
                             ParentName = q.Parent?.Name,
                             q.Link,
                             q.Icon
                         };

            }
            return Json(new
            {
                param.sEcho,
                iTotalRecords = rowCount,
                iTotalDisplayRecords = lnRowCount,
                aaData = result
            },
                JsonRequestBehavior.AllowGet);
        }
        public PartialViewResult InsertPagesModal()
        {
            var oModel = new InsertUpdatePageModle();

            var getLstType = _db.Pages.Where(x => x.ParentId == 0 && x.TypeId != 3).ToList();
            if (getLstType.Count > 0)
                oModel.LstParent = getLstType;

            var getPageCategory = _db.PagesCategories.ToList();
            if (getPageCategory.Count > 0)
                oModel.LstPageCategory = getPageCategory;

            //oModel.lstModules = DAL.Account.Modules.GetModules(null).Results;

            return PartialView("PageParts/_PagesInsertModal", oModel);
        }
        public PartialViewResult UpdatePagesModal(string id)
        {
            var pageId = Convert.ToInt32(id);
            var oModel = new InsertUpdatePageModle();

            var getLstType = _db.Pages.Where(x => x.TypeId != 3).ToList();
            if (getLstType.Count > 0)
                oModel.LstParent = getLstType;

            var getPageCategory = _db.PagesCategories.ToList();
            if (getPageCategory.Count > 0)
                oModel.LstPageCategory = getPageCategory;

            //oModel.lstModules = DAL.Account.Modules.GetModules(null).Results;

            if (pageId > 0)
            {
                var getPage = _db.Pages.First(x=>x.Id == pageId );
                if (getPage != null)
                {
                    oModel.OPage = getPage;
                }
            }

            return PartialView("PageParts/_PagesUpdateModal", oModel);
        }
        public JsonResult InsertPages([Bind(Exclude = "Id")] Page oPage)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            var orderId = _db.Pages.Where(x=>x.ParentId == oPage.ParentId).Max(x => x.OrderId);
            if (ModelState.IsValid)
            {
                oPage.OrderId = orderId + 1;
                var oPageInsert = _db.Pages.Add(oPage);
                if (oPageInsert.Id> 0)
                {
                    cStatus = "success";
                    cMsg = Resources.NotifyMsg.InsertSuccessMsg;
                    return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(new { cStatus = "notValid", cMsg = Resources.NotifyMsg.NotValidMsg }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdatePages(Page oPage)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            var page = _db.Pages.FirstOrDefault(x => x.Id == oPage.Id);
            if (page != null)
            {

                _db.Pages.Attach(page);
                page.Name = oPage.Name;
                page.NameEn = oPage.NameEn;
                page.Link = oPage.Link;
                page.Icon = oPage.Icon;
                page.ParentId = oPage.ParentId;
                page.TypeId = oPage.TypeId;
                page.IsActive = oPage.IsActive;
                page.InMenu = oPage.InMenu;
                page.ForAdmin = oPage.ForAdmin;
                page.NeedLogin = oPage.NeedLogin;
                _db.Entry(page).Property(x => x.Name).IsModified = true;
                _db.Entry(page).Property(x => x.NameEn).IsModified = true;
                _db.Entry(page).Property(x => x.Link).IsModified = true;
                _db.Entry(page).Property(x => x.Icon).IsModified = true;
                _db.Entry(page).Property(x => x.ParentId).IsModified = true;
                _db.Entry(page).Property(x => x.TypeId).IsModified = true;
                _db.Entry(page).Property(x => x.IsActive).IsModified = true;
                _db.Entry(page).Property(x => x.InMenu).IsModified = true;
                _db.Entry(page).Property(x => x.ForAdmin).IsModified = true;
                _db.Entry(page).Property(x => x.NeedLogin).IsModified = true;

                _db.SaveChanges();
                cStatus = "success";
                cMsg = Resources.NotifyMsg.UpdateSuccessMsg;
            }
            else
            {
                return Json(new { cStatus = "notValid", cMsg = Resources.NotifyMsg.NotValidMsg }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeletePage(int id)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            var oPage = new Page();
            oPage.Id = Convert.ToInt32(id);
            oPage = _db.Pages.First(x => x.Id == oPage.Id);
            if (oPage != null)
            {
                _db.Pages.Attach(oPage);
                oPage.IsDeleted = true;
                _db.Entry(oPage).Property(x => x.IsDeleted).IsModified = true;

                _db.SaveChanges();
                cStatus = "success";
                cMsg = Resources.NotifyMsg.DeleteSuccessMsg;
            }
            return Json(new { cStatus, cMsg, }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult PagesSearchAutoComplete(string id)
        {
            var getPagesResult = new List<Page>();
            var getPAges = _db.Pages.Where(x=>x.Name.Contains(id.Trim())).ToList();

            if (getPAges.Count > 0)
            {
                getPagesResult = getPAges;
                var result = from q in getPagesResult
                             select new
                             {
                                 q.Name,
                                 q.Id
                             };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(getPagesResult, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

    }
}
