using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using EntityFrameworkPaginate;
using kindergartenNetwork.Helper;
using kindergartenNetwork.Models;
using kindergartenNetwork.Models.DataTableModels;

namespace kindergartenNetwork.Controllers
{
    public class ControlPanelController : BaseController
    {
        private static kindergartenNetworkEntities _db = new kindergartenNetworkEntities();
        // GET: ControlPanel
        public ActionResult Index()
        {
            return View();
        }


        #region UploadSaveAlbumImg
        public JsonResult UploadSaveAlbumImg()
        {
            var fileName = "";
            var file = Request.Files[0];
            var albumId = Request.Form["albumId"];
            if (file != null && file.ContentLength > 0)
            {
                fileName = Path.GetFileName(file.FileName);
                if (fileName != null)
                {
                    string ext = fileName.Split('.')[fileName.Split('.').Length - 1];
                    string n = Guid.NewGuid().ToString();
                    fileName = n + "." + ext;
                    var path = Path.Combine(Server.MapPath("/Content/UploadedFile/Albums/Original/"), fileName);
                    file.SaveAs(path);
                    var thumbPath = Path.Combine(Server.MapPath("/Content/UploadedFile/Albums/Thumbnail/"), fileName);
                    var largePath = Path.Combine(Server.MapPath("/Content/UploadedFile/Albums/Large/"), fileName);
                    GeneralHelper.ResizeImage(path, thumbPath, 250, ext, true);
                    GeneralHelper.ResizeImage(path, largePath, 950, ext, false);
                }
            }


            _db.Media.Add(new Medium { MediaAlbumId = Convert.ToInt32(albumId), FilePath = fileName, MediaType = 11 });
            return Json(new { result = "success", Filename = fileName, }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult UploadMemberClubImg()
        {
            var fileName = "";
            var file = Request.Files[0];
            if (file != null && file.ContentLength > 0)
            {
                fileName = Path.GetFileName(file.FileName);
                if (fileName != null)
                {
                    string ext = fileName.Split('.')[fileName.Split('.').Length - 1];
                    string n = Guid.NewGuid().ToString();
                    fileName = n + "." + ext;
                    var path = Path.Combine(Server.MapPath("/Content/UploadedFile/MemberClubFiles/Original/"), fileName);
                    file.SaveAs(path);
                    var thumbPath = Path.Combine(Server.MapPath("/Content/UploadedFile/MemberClubFiles/Thumbnail/"), fileName);
                    var largePath = Path.Combine(Server.MapPath("/Content/UploadedFile/MemberClubFiles/Large/"), fileName);
                    GeneralHelper.ResizeImage(path, thumbPath, 250, ext, true);
                    GeneralHelper.ResizeImage(path, largePath, 950, ext, false);
                }
            }
            return Json(new { result = "success", Filename = fileName, }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpLoadMemberClubFile()
        {
            var fileName = "";
            var file = Request.Files[0];
            if (file != null && file.ContentLength > 0)
            {
                fileName = Path.GetFileName(file.FileName);
                if (fileName != null)
                {
                    string ext = fileName.Split('.')[fileName.Split('.').Length - 1];
                    string n = Guid.NewGuid().ToString();
                    fileName = n + "." + ext;
                    var path = Path.Combine(Server.MapPath("/Content/UploadedFile/MemberClubFiles/Files/"), fileName);
                    file.SaveAs(path);
                }

            }
            return Json(new { result = "success", Filename = fileName, }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UploadNewsImg()
        {
            var fileName = "";
            var file = Request.Files[0];
            if (file != null && file.ContentLength > 0)
            {
                fileName = Path.GetFileName(file.FileName);
                if (fileName != null)
                {
                    string ext = fileName.Split('.')[fileName.Split('.').Length - 1];
                    string n = Guid.NewGuid().ToString();
                    fileName = n + "." + ext;
                    var path = Path.Combine(Server.MapPath("/Content/UploadedFile/News/Original/"), fileName);
                    file.SaveAs(path);
                    var thumbPath = Path.Combine(Server.MapPath("/Content/UploadedFile/News/Thumbnail/"), fileName);
                    var largePath = Path.Combine(Server.MapPath("/Content/UploadedFile/News/Large/"), fileName);
                    GeneralHelper.ResizeImage(path, thumbPath, 250, ext, true);
                    GeneralHelper.ResizeImage(path, largePath, 950, ext, false);
                }
            }
            return Json(new { result = "success", Filename = fileName, }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UploadAlbumImg()
        {
            var fileName = "";
            var file = Request.Files[0];
            if (file != null && file.ContentLength > 0)
            {
                fileName = Path.GetFileName(file.FileName);
                if (fileName != null)
                {
                    string ext = fileName.Split('.')[fileName.Split('.').Length - 1];
                    string n = Guid.NewGuid().ToString();
                    fileName = n + "." + ext;
                    var path = Path.Combine(Server.MapPath("/Content/UploadedFile/Albums/Original/"), fileName);
                    file.SaveAs(path);
                    var thumbPath = Path.Combine(Server.MapPath("/Content/UploadedFile/Albums/Thumbnail/"), fileName);
                    var largePath = Path.Combine(Server.MapPath("/Content/UploadedFile/Albums/Large/"), fileName);
                    GeneralHelper.ResizeImage(path, thumbPath, 250, ext, true);
                    GeneralHelper.ResizeImage(path, largePath, 950, ext, false);
                }
            }
            return Json(new { result = "success", Filename = fileName, }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpLoadFile()
        {
            var fileName = "";
            var file = Request.Files[0];
            if (file != null && file.ContentLength > 0)
            {
                fileName = Path.GetFileName(file.FileName);
                if (fileName != null)
                {
                    string ext = fileName.Split('.')[fileName.Split('.').Length - 1];
                    string n = Guid.NewGuid().ToString();
                    fileName = n + "." + ext;
                    var path = Path.Combine(Server.MapPath("/Content/UploadedFile/Attachments/"), fileName);
                    file.SaveAs(path);
                }

            }
            return Json(new { result = "success", Filename = fileName, }, JsonRequestBehavior.AllowGet);
        }
        public static string GetMimeTypeByWindowsRegistry(string fileNameOrExtension)
        {
            string mimeType = "application/unknown";
            string ext = fileNameOrExtension.Contains(".") ? Path.GetExtension(fileNameOrExtension).ToLower() : "." + fileNameOrExtension;
            Microsoft.Win32.RegistryKey regKey = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(ext);
            if (regKey != null && regKey.GetValue("Content Type") != null) mimeType = regKey.GetValue("Content Type").ToString();
            return mimeType;
        }
        #endregion

        #region StaticPages
        public ActionResult HomePage()
        {
            var oModel = new Models.NewsModels.StaticPageModel();
            var getStaticPage = _db.StaticPages.First(x=>x.Id == 1 );
            if (getStaticPage != null)
                oModel.OStaticPage = getStaticPage;
            return View(oModel);
        }
        public ActionResult AboutPage()
        {
            var oModel = new Models.NewsModels.StaticPageModel();
            var getStaticPage = _db.StaticPages.First(x=>x.Id == 2 );
            if (getStaticPage != null)
                oModel.OStaticPage = getStaticPage;
            return View(oModel);
        }
        public ActionResult ContactPage()
        {
            var oModel = new Models.NewsModels.StaticPageModel();
            var getStaticPage = _db.StaticPages.First(x=>x.Id == 3 );
            if (getStaticPage != null)
                oModel.OStaticPage = getStaticPage;
            return View(oModel);
        }
        public JsonResult GetStaticPagesDataTable(JQueryDataTableParamModel param)
        {
            var oStaticPage = new StaticPage();
            if (!string.IsNullOrEmpty(Request.QueryString["Id"]))
                oStaticPage.Id = Convert.ToInt32(Request.QueryString["Id"]);

            DataTableProcessModel m = new DataTableProcessModel();
            DataTableProcessModel dtProcess = DataTableProcesses.DataTableEslestir(param, m);
            //oStaticPage.SortCol = dtProcess.SortCol;
            //oStaticPage.SortType = dtProcess.SortType;
            //oStaticPage.Page = dtProcess.Page;
            //oStaticPage.RowPerPage = dtProcess.RowPerPage;

            //var getStaticPage = DAL.News.StaticPages.StaticPagesGet(oStaticPage);

            //var filters = new Filters<StaticPage>();
            //filters.Add(Convert.ToBoolean(oUserType.Name), x => x.Name == oUserType.Name);
            //filters.Add(true, x => x.IsDeleted == false);

            var sorts = new Sorts<StaticPage>();
            sorts.Add(dtProcess.SortCol == "Id", x => x.Id);

            var getStaticPage = _db.StaticPages.Paginate(dtProcess.Page, dtProcess.RowPerPage, sorts);
            
            if (getStaticPage.RecordCount  > 0)
            {
                var getStaticPageResult = getStaticPage.Results;

                int rowCount = getStaticPage.RecordCount;
                int lnRowCount = rowCount;

                var result = from q in getStaticPageResult
                             select new
                             {
                                 q.Id,
                                 q.Image,
                                 q.PageName
                             };
                return Json(new
                {
                    param.sEcho,
                    iTotalRecords = rowCount,
                    iTotalDisplayRecords = lnRowCount,
                    aaData = result
                },
                    JsonRequestBehavior.AllowGet);
            }
            else
            {

                int rowCount = getStaticPage.RecordCount;
                int lnRowCount = rowCount;

                var result = from q in getStaticPage.Results
                             select new
                             {
                                 q.Id,
                                 q.Image,
                                 q.PageName
                             };

                return Json(new
                {
                    param.sEcho,
                    iTotalRecords = rowCount,
                    iTotalDisplayRecords = lnRowCount,
                    aaData = result
                },
                    JsonRequestBehavior.AllowGet);
            }
        }
        //public PartialViewResult SaveStaticPageModal(string id)
        //{
        //    var staticPageId = Convert.ToInt32(id);
        //    var oModel = new Models.News.StaticPageModel();
        //    var getStaticPage = DAL.News.StaticPages.StaticPagesGet(new DTO.News.StaticPages { IsList = true, Id = staticPageId });
        //    if (getStaticPage.HasResult)
        //        oModel.OStaticPages = (getStaticPage.Results as List<DTO.News.StaticPages>).FirstOrDefault();

        //    return PartialView("StaticPageParts/_StaticPageSaveModal", oModel);
        //}
        [ValidateInput(false)]
        public JsonResult SaveStaticPage(StaticPage oStaticPages)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            var page = _db.StaticPages.FirstOrDefault(x => x.Id == oStaticPages.Id);
            if (page != null && ModelState.IsValid)
            {

                _db.StaticPages.Attach(page);
                page.Title = oStaticPages.Title;
                if (!string.IsNullOrEmpty(oStaticPages.Description))
                    page.Description = oStaticPages.Description;
                if (!string.IsNullOrEmpty(oStaticPages.Image))
                    page.Image = oStaticPages.Image;
                if (!string.IsNullOrEmpty(oStaticPages.Image2))
                    page.Image2 = oStaticPages.Image2;
                if (!string.IsNullOrEmpty(oStaticPages.image3))
                    page.image3 = oStaticPages.image3;
                if (!string.IsNullOrEmpty(oStaticPages.Mobile))
                    page.Mobile = oStaticPages.Mobile;
                if (!string.IsNullOrEmpty(oStaticPages.Phone))
                    page.Phone = oStaticPages.Phone;
                if (!string.IsNullOrEmpty(oStaticPages.Email1))
                    page.Email1 = oStaticPages.Email1;
                page.Email2 = oStaticPages.Email2;
                page.UpdatedBy = User.Id;
                page.UpdatedDate = DateTime.Now;
                _db.Entry(page).Property(x => x.Title).IsModified = true;
                if (!string.IsNullOrEmpty(oStaticPages.Description))
                    _db.Entry(page).Property(x => x.Description).IsModified = true;
                if (!string.IsNullOrEmpty(oStaticPages.Image))
                    _db.Entry(page).Property(x => x.Image).IsModified = true;
                if (!string.IsNullOrEmpty(oStaticPages.Image2))
                    _db.Entry(page).Property(x => x.Image2).IsModified = true;
                if (!string.IsNullOrEmpty(oStaticPages.image3))
                    _db.Entry(page).Property(x => x.image3).IsModified = true;
                if (!string.IsNullOrEmpty(oStaticPages.Mobile))
                    _db.Entry(page).Property(x => x.Mobile).IsModified = true;
                if (!string.IsNullOrEmpty(oStaticPages.Phone))
                    _db.Entry(page).Property(x => x.Phone).IsModified = true;
                if (!string.IsNullOrEmpty(oStaticPages.Email1))
                    _db.Entry(page).Property(x => x.Email1).IsModified = true;
                _db.Entry(page).Property(x => x.Email2).IsModified = true;
                _db.Entry(page).Property(x => x.UpdatedBy).IsModified = true;
                _db.Entry(page).Property(x => x.UpdatedDate).IsModified = true;

                _db.SaveChanges();
                cStatus = "success";
                cMsg = Resources.NotifyMsg.UpdateSuccessMsg;
            }
            else
            {
                return Json(new { cStatus = "notValid", cMsg = GeneralHelper.GetErrorMessage(ModelState, Resources.NotifyMsg.ErrorInField) }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Categories
        public ActionResult Categories()
        {
            return View();
        }
        public JsonResult GetCategoriesDataTable(JQueryDataTableParamModel param)
        {
            var oCategory = new Category();
            if (!string.IsNullOrEmpty(Request.QueryString["Id"]))
                oCategory.Id = Convert.ToInt32(Request.QueryString["Id"]);

            DataTableProcessModel m = new DataTableProcessModel();
            DataTableProcessModel dtProcess = DataTableProcesses.DataTableEslestir(param, m);
            //oCategory.SortCol = dtProcess.SortCol;
            //oCategory.SortType = dtProcess.SortType;
            //oCategory.Page = dtProcess.Page;
            //oCategory.RowPerPage = dtProcess.RowPerPage;
            //oCategory.IsList = true;

            //var getCategory = DAL.News.News.CategoryGet(oCategory);

            var filters = new Filters<Category>();
            filters.Add(oCategory.Id > 0, x => x.Id == oCategory.Id);
            filters.Add(true, x => x.IsDeleted == false);
            filters.Add(true, x => x.Id > 1);

            var sorts = new Sorts<Category>();
            sorts.Add(dtProcess.SortCol == "Id", x => x.Id);

            var getCategory = _db.Categories.Paginate(dtProcess.Page, dtProcess.RowPerPage, sorts, filters);


            if (getCategory.RecordCount > 0)
            {
                var getCategoryResult = getCategory.Results;

                int rowCount = getCategory.RecordCount;
                int lnRowCount = rowCount;

                var result = from q in getCategoryResult
                             select new
                             {
                                 q.Id,
                                 q.NameAr,
                                 q.NameEn
                             };

                return Json(new
                {
                    param.sEcho,
                    iTotalRecords = rowCount,
                    iTotalDisplayRecords = lnRowCount,
                    aaData = result
                },
                    JsonRequestBehavior.AllowGet);
            }
            else
            {

                int rowCount = getCategory.RecordCount;
                int lnRowCount = rowCount;

                var result = from q in getCategory.Results
                             select new
                             {
                                 q.Id,
                                 q.NameAr,
                                 q.NameEn
                             };

                return Json(new
                {
                    param.sEcho,
                    iTotalRecords = rowCount,
                    iTotalDisplayRecords = lnRowCount,
                    aaData = result
                },
                    JsonRequestBehavior.AllowGet);
            }
        }
        public PartialViewResult SaveCategoryModal(string id)
        {
            var oModel = new Models.NewsModels.CategoryModel();
            var categoryId = Convert.ToInt32(id);
            if (categoryId > 0)
            {
                var getCategory = _db.Categories.First(x=>x.Id == categoryId );
                if (getCategory != null)
                    oModel.OCategory = getCategory;
            }
            return PartialView("CategoryParts/_CategorySaveModal", oModel);
        }
        public JsonResult SaveCategory(Category oCategory)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            if (ModelState.IsValid)
            {
                if (oCategory.Id > 0)
                {
                    var category = _db.Categories.First(x => x.Id == oCategory.Id);
                    if (category != null)
                    {
                        _db.Categories.Attach(category);
                        category.NameAr = oCategory.NameAr;
                        _db.Entry(category).Property(x => x.NameAr).IsModified = true;
                        _db.SaveChanges();
                        cStatus = "success";
                        cMsg = Resources.NotifyMsg.SaveSuccessMsg;
                        return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    var oCategorySave = _db.Categories.Add(oCategory);
                    if (oCategorySave.Id > 0)
                    {
                        cStatus = "success";
                        cMsg = Resources.NotifyMsg.SaveSuccessMsg;
                        return Json(new {cStatus, cMsg}, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            else
            {
                return Json(new { cStatus = "notValid", cMsg = GeneralHelper.GetErrorMessage(ModelState, Resources.NotifyMsg.ErrorInField) }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteCategory(int id)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            var category = _db.Categories.First(x => x.Id == id);
            if (category != null)
            {
                var oResult = _db.Categories.Remove(category);
                cStatus = "success";
                cMsg = Resources.NotifyMsg.DeleteSuccessMsg;
            }

            return Json(new { cStatus, cMsg, }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region News
        public ActionResult News()
        {
            var oModel = new Models.NewsModels.NewsModel();

            var getUsers = _db.UserAccounts.Where(x=>x.IsDeleted == false && x.IsActive == true && x.UserTypeId != 1).ToList();
            if (getUsers.Count > 0)
                oModel.LstUsers = getUsers;
            var getNewCategory = _db.Categories.First(x=>x.Id == 1 && x.IsDeleted == false);
            if (getNewCategory != null)
                oModel.OCategory = getNewCategory;
            return View(oModel);
        }
        public JsonResult GetNewsDataTable(JQueryDataTableParamModel param)
        {
            var oNews = new News();
            if (!string.IsNullOrEmpty(Request.QueryString["NewsSearch"]))
                oNews.Title = Request.QueryString["NewsSearch"];
            if (!string.IsNullOrEmpty(Request.QueryString["Category"]))
                oNews.CategoryId = Convert.ToInt32(Request.QueryString["Category"]);
            if (!string.IsNullOrEmpty(Request.QueryString["InsertedBy"]))
                oNews.InsertedBy = Convert.ToInt32(Request.QueryString["InsertedBy"]);

            CultureInfo newCulture = (CultureInfo)Thread.CurrentThread.CurrentCulture.Clone();
            newCulture.DateTimeFormat.ShortDatePattern = "dd-MM-yyyy";
            newCulture.DateTimeFormat.DateSeparator = "-";
            Thread.CurrentThread.CurrentCulture = newCulture;
            if (!string.IsNullOrEmpty(Request.QueryString["FromDate"]))
            {
                string date = Request.QueryString["FromDate"];
                oNews.FromDate = CommonHelpExtension.ConvertToUTC(Convert.ToDateTime(date, newCulture));
            }
            if (!string.IsNullOrEmpty(Request.QueryString["ToDate"]))
            {
                string date = Request.QueryString["ToDate"];
                oNews.ToDate = CommonHelpExtension.ConvertToUTC(Convert.ToDateTime(date, newCulture));
            }
            DataTableProcessModel m = new DataTableProcessModel();
            DataTableProcessModel dtProcess = DataTableProcesses.DataTableEslestir(param, m);
            //oNews.SortCol = dtProcess.SortCol;
            //oNews.SortType = dtProcess.SortType;
            //oNews.Page = dtProcess.Page;
            //oNews.RowPerPage = dtProcess.RowPerPage;

            //var getNews = DAL.News.News.NewsGet(oNews, 0);

            var filters = new Filters<News>();
            filters.Add(oNews.Id > 0, x => x.Id == oNews.Id);
            filters.Add(oNews.FromDate != new DateTime(), x => x.PublishDate >= oNews.FromDate);
            filters.Add(oNews.ToDate != new DateTime(), x => x.PublishDate <= oNews.ToDate);
            filters.Add(!string.IsNullOrEmpty(oNews.Title), x => x.Title.Contains(oNews.Title));
            filters.Add(true, x => x.IsDeleted == false);
            filters.Add(true, x => x.CategoryId == 1);

            var sorts = new Sorts<News>();
            sorts.Add(dtProcess.SortCol == "Id", x => x.Id);
            sorts.Add(dtProcess.SortCol == "Title", x => x.Title);
            sorts.Add(dtProcess.SortCol == "PublishDate", x => x.PublishDate);

            var getNews = _db.News.Paginate(dtProcess.Page, dtProcess.RowPerPage, sorts, filters);

            if (getNews.RecordCount > 0)
            {
                var getNewsResult = getNews.Results;

                int rowCount = getNews.RecordCount;
                int lnRowCount = rowCount;

                var result = from q in getNewsResult
                             select new
                             {
                                 q.Id,
                                 q.IsActive,
                                 //q.ActionBy,
                                 //q.ActionDate,
                                 q.CategoryId,
                                 //q.Details,
                                 q.Image,
                                 q.LangId,
                                 q.Status,
                                 //q.Summary,
                                 q.Title,
                                 //q.SavedBy,
                                 //q.SavedDate,
                                 q.ViewsCount,
                                 q.InsertedBy,
                                 PublishDate = q.PublishDate.ToString("yyyy-MM-dd HH:mm:ss"),
                                 InsertedByName = q.UserAccount.Name,
                                 q.Category.NameAr,
                                 q.Category.NameEn,

                             };

                return Json(new
                {
                    param.sEcho,
                    iTotalRecords = rowCount,
                    iTotalDisplayRecords = lnRowCount,
                    aaData = result
                },
                    JsonRequestBehavior.AllowGet);
            }
            else
            {

                int rowCount = getNews.RecordCount;
                int lnRowCount = rowCount;

                var result = from q in getNews.Results
                             select new
                             {
                                 q.Id,
                                 q.IsActive,
                                 //q.ActionBy,
                                 //q.ActionDate,
                                 q.CategoryId,
                                 //q.Details,
                                 q.Image,
                                 q.LangId,
                                 q.Status,
                                 //q.Summary,
                                 q.Title,
                                 //q.SavedBy,
                                 //q.SavedDate,
                                 q.ViewsCount,
                                 q.InsertedBy,
                                 PublishDate = q.PublishDate.ToString("yyyy-MM-dd HH:mm:ss"),
                                 q.UserAccount.Name,
                                 q.Category.NameAr,
                                 q.Category.NameEn,
                             };

                return Json(new
                {
                    param.sEcho,
                    iTotalRecords = rowCount,
                    iTotalDisplayRecords = lnRowCount,
                    aaData = result
                },
                    JsonRequestBehavior.AllowGet);
            }
        }
        public PartialViewResult SaveNewsModal(string id, string categoryId)
        {
            var newsId = Convert.ToInt32(id);
            ViewBag.CategoryId = Convert.ToInt32(categoryId);
            var oModel = new Models.NewsModels.NewsModel();
            if (newsId > 0)
            {
                var getNews = _db.News.First(x=>x.Id == newsId);
                if (getNews != null)
                    oModel.ONews = getNews;
            }
            var getNewCategories = _db.Categories.Where(x=>x.IsDeleted == false).ToList();
            if (getNewCategories.Count > 0)
                oModel.LstCategory = getNewCategories;

            return PartialView("NewsParts/_NewsSaveModal", oModel);
        }
        [ValidateInput(false)]
        public JsonResult SaveNews(News oNews)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            if (ModelState.IsValid)
            {
                if (!oNews.IsInHome)
                    oNews.HomePosition = "";
                if (oNews.Id > 0)
                {
                    var news = _db.News.First(x => x.Id == oNews.Id);
                    if (news != null)
                    {
                        _db.News.Attach(news);
                        news.Title = oNews.Title;
                        news.Summary = oNews.Summary;
                        news.Details = oNews.Details;
                        news.Image = oNews.Image;
                        news.HomePosition = oNews.HomePosition;
                        news.IsInHome = oNews.IsInHome;
                        news.IsActive = oNews.IsActive;
                        news.UpdatedBy = User.Id;
                        news.UpdatedDate = DateTime.Now;
                        _db.Entry(news).Property(x => x.Title).IsModified = true;
                        _db.Entry(news).Property(x => x.Summary).IsModified = true;
                        _db.Entry(news).Property(x => x.Details).IsModified = true;
                        _db.Entry(news).Property(x => x.Image).IsModified = true;
                        _db.Entry(news).Property(x => x.HomePosition).IsModified = true;
                        _db.Entry(news).Property(x => x.IsInHome).IsModified = true;
                        _db.Entry(news).Property(x => x.IsActive).IsModified = true;
                        _db.Entry(news).Property(x => x.UpdatedBy).IsModified = true;
                        _db.Entry(news).Property(x => x.UpdatedDate).IsModified = true;
                        _db.SaveChanges();
                        cStatus = "success";
                        cMsg = Resources.NotifyMsg.SaveSuccessMsg;
                        return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    oNews.InsertedBy = User.Id;
                    var oNewsSave = _db.News.Add(oNews);
                    if (oNewsSave.Id > 0)
                    {
                        var newsId = oNewsSave.Id;
                        cStatus = "success";
                        cMsg = Resources.NotifyMsg.SaveSuccessMsg;
                        return Json(new { cStatus, cMsg, id = newsId }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            else
            {
                return Json(new { cStatus = "notValid", cMsg = GeneralHelper.GetErrorMessage(ModelState, Resources.NotifyMsg.ErrorInField) }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { cStatus, cMsg }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteNews(int id)
        {
            var cStatus = "error";
            var cMsg = Resources.NotifyMsg.ErrorMsg;
            var news = _db.News.First(x => x.Id == id);
            if (news != null)
            {
                _db.News.Remove(news);
                cStatus = "success";
                cMsg = Resources.NotifyMsg.DeleteSuccessMsg;
            }
            return Json(new { cStatus, cMsg, }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SearchAutoCompleteNews(string id, int? categoryId)
        {
            var getNewsResult = new List<News>();
            var oNews = new News();
            oNews.Title = id;
            if (categoryId.HasValue)
                oNews.CategoryId = categoryId.Value;
            var getNews = _db.News.Where(x=>x.Title.Contains(oNews.Title)).ToList();
            if (categoryId.HasValue)
                    getNews = getNews.Where(x=>x.CategoryId == categoryId.Value).ToList();

            if (getNews.Count > 0)
            {
                getNewsResult = getNews;
                var result = from q in getNewsResult
                             select new
                             {
                                 Title = q.Title.Substring(0, 30),
                                 q.Id
                             };
                return Json(result, JsonRequestBehavior.AllowGet);
            }

            return Json(getNewsResult, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}