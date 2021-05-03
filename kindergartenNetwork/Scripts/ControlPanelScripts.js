var ControlPanelScripts = function () {
    /****************/
    var closeModal = function () {
        $(".closeModal").off("click").click(function () {
            $(".contentDiv").find(".portle-body").html('');
            $(".contentDiv").hide();
            $(".tableDiv").show();

        });
    };
    var scrollToTop = function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
    var uploadImg = function (uploader, input) {
        var flag = true;
        $(uploader).off('change').change(function () {
            if (flag === true) {
                flag = false;
                var myFile = this.files[0];
                var size = 0;
                if (myFile !== undefined)
                    size = parseInt(this.files[0].size);
                if (size !== undefined)
                    size = size / 5120;
                var file = $(this).val();
                var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
                var type = false;
                if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif' || extension === 'bmp')
                    type = true;
                if (size <= 5120 && type === true) {
                    //$('.error-message-image').slideUp(500);
                    var fd = new FormData();

                    fd.append("choose-file", myFile);
                    $.ajax({
                        url: '/ControlPanel/UploadNewsImg',
                        type: 'POST',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        xhr: function () {

                            var xhr = new window.XMLHttpRequest();
                            xhr.upload.addEventListener('progress',
                                function (e) {
                                    // THIS IS ONLY RUNS ONCE!!!
                                    if (e.lengthComputable) {
                                        //    $('#progressbar').css('width', (e.loaded / e.total) * 100 + '%');
                                        console.log((e.loaded / e.total) * 100);
                                    }
                                },
                                false);
                            return xhr;

                        },
                        beforeSend: function () {
                        },
                        success: function (data) {
                            flag = true;
                            $(input).val(data.Filename);
                        }
                    });
                } else {
                    flag = true;
                    if (size > 5120) {
                        gsNotifyMsg("حجم الصورة غير مقبول", "error");
                    } else if (type === false && size > 0) {
                        gsNotifyMsg("الرجاء اختيار صورة بصيغة صحيحة", "error");
                    } else {
                        gsNotifyMsg("الرجاء اختيار صورة", "error");
                    }
                }
            };
        });
    };
    var uploadAlbums = function () {
        var flag = true;
        $("#imgUploadUser").off('change').change(function () {
            if (flag === true) {
                flag = false;
                var myFile = this.files[0];
                var size = 0;
                if (myFile !== undefined)
                    size = parseInt(this.files[0].size);
                if (size !== undefined)
                    size = size / 5120;
                var file = $(this).val();
                var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
                var type = false;
                if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif' || extension === 'bmp')
                    type = true;
                if (size <= 2024 && type === true) {
                    var fd = new FormData();
                    fd.append("choose-file", myFile);
                    $.ajax({
                        url: '/ControlPanel/UploadAlbumImg',
                        type: 'POST',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        xhr: function () {

                            var xhr = new window.XMLHttpRequest();
                            xhr.upload.addEventListener('progress',
                                function (e) {
                                    // THIS IS ONLY RUNS ONCE!!!
                                    if (e.lengthComputable) {
                                        //    $('#progressbar').css('width', (e.loaded / e.total) * 100 + '%');
                                        console.log((e.loaded / e.total) * 100);
                                    }
                                },
                                false);
                            return xhr;

                        },
                        beforeSend: function () {
                        },
                        success: function (data) {
                            flag = true;
                            $("#hdImage").val(data.Filename);
                        }
                    });
                } else {
                    flag = true;
                    if (size > 2024) {
                        gsNotifyMsg("حجم الصورة غير مقبول", "error");
                    } else if (type === false && size > 0) {
                        gsNotifyMsg("الرجاء اختيار صورة بصيغة صحيحة", "error");
                    } else {
                        gsNotifyMsg("الرجاء اختيار صورة", "error");
                    }
                }
            };
        });
    };
    var uploadFile = function () {
        var flag = true;
        $("#fileUpload").off('change').change(function () {
            if (flag === true) {
                flag = false;
                var my_file = this.files[0];
                var size = 0;
                if (my_file !== undefined)
                    size = parseInt(this.files[0].size);
                if (size !== undefined)
                    size = size / 5120;
                var file = $(this).val();
                var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
                //var type = false;
                //if (extension == 'jpg' || extension == 'jpeg' || extension == 'png' || extension == 'gif' || extension == 'bmp')
                type = true;
                if (size <= 51200 && type === true) {
                    //$('.error-message-image').slideUp(500);
                    var fd = new FormData();

                    fd.append("choose-file", my_file);
                    $.ajax({
                        url: '/ControlPanel/UpLoadFile',
                        type: 'POST',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        xhr: function () {

                            var xhr = new window.XMLHttpRequest();
                            xhr.upload.addEventListener('progress',
                                function (e) {
                                    // THIS IS ONLY RUNS ONCE!!!
                                    if (e.lengthComputable) {
                                        //    $('#progressbar').css('width', (e.loaded / e.total) * 100 + '%');
                                        console.log((e.loaded / e.total) * 100);
                                    }
                                },
                                false);
                            return xhr;

                        },
                        beforeSend: function () {
                        },
                        success: function (data) {
                            flag = true;
                            $("#hdFileName").val(data.Filename);
                        }
                    });
                } else {
                    flag = true;
                    var message = "";
                    if (size > 51200) {
                        message = "حجم الصورة غير مقبول";
                    }
                    //else if (type == false && size > 0) {
                    //    message = "الرجاء اختيار صورة بصيغة (JPG, PNG)";
                    //} 
                    else {
                        message = "الرجاء اختيار صورة";
                    }
                    gsNotifyMsg(message, "error");
                }
            };
        });
    };
    var uploadAvatar = function () {
        var flag = true;
        $("#hdAvatar").off('change').change(function () {
            if (flag === true) {
                flag = false;
                var my_file = this.files[0];
                var size = 0;
                if (my_file !== undefined)
                    size = parseInt(this.files[0].size);
                if (size !== undefined)
                    size = size / 5120;
                var file = $(this).val();
                var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
                var type = false;
                if (extension === 'jpg' ||
                    extension === 'jpeg' ||
                    extension === 'png' ||
                    extension === 'gif' ||
                    extension === 'bmp')
                    type = true;
                if (size <= 2024 && type === true) {
                    //$('.error-message-image').slideUp(500);
                    var fd = new FormData();

                    fd.append("choose-file", my_file);
                    $.ajax({
                        url: '/Management/UploadUserImg',
                        type: 'POST',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        xhr: function () {

                            var xhr = new window.XMLHttpRequest();
                            xhr.upload.addEventListener('progress',
                                function (e) {
                                    // THIS IS ONLY RUNS ONCE!!!
                                    if (e.lengthComputable) {
                                        //    $('#progressbar').css('width', (e.loaded / e.total) * 100 + '%');
                                        console.log((e.loaded / e.total) * 100);
                                    }
                                },
                                false);
                            return xhr;

                        },
                        beforeSend: function () {
                        },
                        success: function (data) {
                            flag = true;
                            $("#hdAvatar").attr("value", data.Filename);
                            $("#imgAvatar").attr("src", "/Content/UploadedFile/Account/Avatar/Thumbnail/" + data.Filename);
                            $.ajax({
                                type: "POST",
                                cache: false,
                                url: "/ControlPanel/SaveUserAvatar",
                                data: { "Id": $(".tbAccountId").attr("data-accountId"), "Avatar": data.Filename },
                                dataType: "json",
                                success: function (data) {

                                    if (data.cStatus === "success") {
                                        gsNotifyMsg(data.cMsg, data.cStatus);
                                        clubsDataTableUpdate();
                                    } else if (data.cStatus === "notValid") {
                                        notValidOperations(data.cMsg);
                                    } else {
                                        notValidOperations(data.cMsg);
                                    }
                                },
                            });
                        }
                    });
                } else {
                    flag = true;
                    if (size > 2024) {
                        gsNotifyMsg("حجم الصورة غير مقبول", "error");
                    } else if (type === false && size > 0) {
                        gsNotifyMsg("الرجاء اختيار صورة بصيغة صحيحة", "error");
                    } else {
                        gsNotifyMsg("الرجاء اختيار صورة", "error");
                    }
                }
            };
        });
    };
    var upLoadMemberClubFile = function () {
        var flag = true;
        $("#fileUpload").off('change').change(function () {
            if (flag === true) {
                flag = false;
                var my_file = this.files[0];
                var size = 0;
                if (my_file !== undefined)
                    size = parseInt(this.files[0].size);
                if (size !== undefined)
                    size = size / 5120;
                var file = $(this).val();
                var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
                //var type = false;
                //if (extension == 'jpg' || extension == 'jpeg' || extension == 'png' || extension == 'gif' || extension == 'bmp')
                type = true;
                if (size <= 2024 && type === true) {
                    //$('.error-message-image').slideUp(500);
                    var fd = new FormData();

                    fd.append("choose-file", my_file);
                    $.ajax({
                        url: '/ControlPanel/UpLoadMemberClubFile',
                        type: 'POST',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        xhr: function () {

                            var xhr = new window.XMLHttpRequest();
                            xhr.upload.addEventListener('progress',
                                function (e) {
                                    // THIS IS ONLY RUNS ONCE!!!
                                    if (e.lengthComputable) {
                                        //    $('#progressbar').css('width', (e.loaded / e.total) * 100 + '%');
                                        console.log((e.loaded / e.total) * 100);
                                    }
                                },
                                false);
                            return xhr;

                        },
                        beforeSend: function () {
                        },
                        success: function (data) {
                            flag = true;
                            $("#hdFileName").val(data.Filename);
                        }
                    });
                } else {
                    flag = true;
                    var message = "";
                    if (size > 2024) {
                        message = "حجم الصورة غير مقبول";
                    }
                    //else if (type == false && size > 0) {
                    //    message = "الرجاء اختيار صورة بصيغة (JPG, PNG)";
                    //} 
                    else {
                        message = "الرجاء اختيار صورة";
                    }
                    gsNotifyMsg(message, "error");
                }
            };
        });
    };
    var uploadMemberClubImg = function () {
        var flag = true;
        $("#imgUpload").off('change').change(function () {
            if (flag === true) {
                flag = false;
                var my_file = this.files[0];
                var size = 0;
                if (my_file !== undefined)
                    size = parseInt(this.files[0].size);
                if (size !== undefined)
                    size = size / 5120;
                var file = $(this).val();
                var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
                var type = false;
                if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif' || extension === 'bmp')
                    type = true;
                if (size <= 5120 && type === true) {
                    //$('.error-message-image').slideUp(500);
                    var fd = new FormData();

                    fd.append("choose-file", my_file);
                    $.ajax({
                        url: '/ControlPanel/UploadMemberClubImg',
                        type: 'POST',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        xhr: function () {

                            var xhr = new window.XMLHttpRequest();
                            xhr.upload.addEventListener('progress',
                                function (e) {
                                    // THIS IS ONLY RUNS ONCE!!!
                                    if (e.lengthComputable) {
                                        //    $('#progressbar').css('width', (e.loaded / e.total) * 100 + '%');
                                        console.log((e.loaded / e.total) * 100);
                                    }
                                },
                                false);
                            return xhr;

                        },
                        beforeSend: function () {
                        },
                        success: function (data) {
                            flag = true;
                            $("#hdImage").val(data.Filename);
                        }
                    });
                } else {
                    flag = true;
                    if (size > 5120) {
                        gsNotifyMsg("حجم الصورة غير مقبول", "error");
                    } else if (type === false && size > 0) {
                        gsNotifyMsg("الرجاء اختيار صورة بصيغة صحيحة", "error");
                    } else {
                        gsNotifyMsg("الرجاء اختيار صورة", "error");
                    }
                }
            };
        });
    };

    /* ***** News ******* */
    var newsDataTable = function (category) {
        $('#tblNews').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetNewsDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[7, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "NewsSearch", "value": $("#txtNewsSearch").val() });
                aoData.push({ "name": "Category", "value": category });
                aoData.push({ "name": "InsertedBy", "value": $("#ddlUsers").val() });
                aoData.push({ "name": "FromDate", "value": $("#tbFromDate").val() });
                aoData.push({ "name": "ToDate", "value": $("#tbToDate").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '10%', "mDataProp": "Image", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '40%', "mDataProp": "Title", "bSortable": false, "sClass": "titlejustify" },
                //{ "sType": "html", "sWidth": '20%', "mDataProp": "NameAr", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "PublishDate", "bSortable": false },
                { "sType": "html", "sWidth": '10%', "mDataProp": "InsertedByName", "bSortable": false },
                { "sType": "html", "sWidth": '7%', "mDataProp": "IsActive", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Status", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '8%', "mDataProp": "LangId", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(7)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSaveNews"data-categoryId="' + aData.CategoryId + '" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteNews" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(0)', nRow).html('<img  style="width: 100px;" alt="" src="/Content/UploadedFile/News/Thumbnail/' + aData.Image + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Account/Avatar/NoImage.png\';"/>');
                
                if (aData.LangId === 1) {
                    $('td:eq(6)', nRow).html('<span>' + Messages.ar +'</span>');

                }
                else if (aData.LangId === 2) {
                    $('td:eq(6)', nRow).html('<span>' + Messages.en +'</span>');

                }
                if (aData.IsActive === true) {
                    $('td:eq(4)', nRow).html("<span class='font-green-meadow fa fa-fw fa-check-circle-o fa-lg'></span>");
                } else {
                    $('td:eq(4)', nRow).html("<span class='font-red-thunderbird fa fa-fw fa-times-circle-o fa-lg'></span>");
                }
                if (aData.Status === 1) {
                    $('td:eq(5)', nRow).html("<span>فعال</span>");
                } else if (aData.Status === 2) {
                    $('td:eq(5)', nRow).html("<span>قيد الانتظار</span>");
                } else if (aData.Status === 3) {
                    $('td:eq(5)', nRow).html("<span>مرفوض</span>");
                }
                $(nRow).dblclick(function () {
                    saveNewsModal($(this).find(".btnSaveNews").attr("data-id"), $(this).find(".btnSaveNews").attr("data-categoryId"), $("#SaveModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveNewsModal();
                deleteNews();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var newsDataTableUpdate = function () {
        var oTable = $('#tblNews').dataTable();
        oTable.fnDraw(false);
    };
    var handleSummernote = function () {
        $('.tbSummerNote').summernote({
            callbacks: {
                onImageUpload: function (files) {
                    that = $(this);
                    data = new FormData();
                    data.append("file", files[0]);
                    $.ajax({
                        data: data,
                        type: "POST",
                        url: '/ControlPanel/UploadNewsImg',
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            $(that).summernote('insertImage', "/Content/UploadedFile/News/Large/" + data.Filename);
                        }
                    });
                }
            },
            fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
            dialogsInBody: true,
            dialogsFade: false,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                ['fontsize', ['fontsize']],

                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video', 'hr']],
                ['view', ['fullscreen', 'codeview']],
                ['help', ['help']],
            ],
            height: 300
        });
        //API:
        //var sHTML = $('#summernote_1').code(); // get code
        //$('#summernote_1').destroy(); // destroy
    }
    var saveNewsModal = function (id, categoryId, bsModal) {
        bsModal.html('');
        $(".page-content").LoadingOverlay("show");
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveNewsModal?id=' + id + '&categoryId=' + categoryId, '', function () {
                $(".contentDiv").show();
                $(".tableDiv").hide();
                resetbooststrapSelect();
                handleBootstrapSelect();
                handleSummernote();
                handleDatePickers();
                closeModal();
                SaveNews();
                uploadImg($("#imgUploadUser"), $("#hdImage"));
                $('#tbPublishDate').datetimepicker({
                    format: 'YYYY-MM-DD HH:mm'
                });
                $("#tbNewsKeyWords").tagsinput();
                $(".page-content").LoadingOverlay("hide", true);
                $("#cbIsInHome").change(function () {
                    if ($(this).is(':checked')) {
                        $("#ddlHomePosition").closest(".formElement").show();
                    }
                    else {
                        $("#ddlHomePosition").closest(".formElement").hide();
                    }
                });
            });
        }, 100);
    }
    var getSaveNewsModal = function () {
        var bsModal = $("#SaveModal");
        $(".btnSaveNews").off('click').click(function () {
            var id = $(this).attr("data-id");
            var categoryId = $(this).attr("data-categoryId");
            bsModal.html('');
            $(".page-content").LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveNewsModal?id=' + id + '&categoryId=' + categoryId, '', function () {
                    $(".contentDiv").show();
                    $(".tableDiv").hide();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    handleSummernote();
                    handleDatePickers();
                    closeModal();
                    SaveNews();
                    uploadImg($("#imgUploadUser"), $("#hdImage"));
                    $('#tbPublishDate').datetimepicker({ format: 'YYYY-MM-DD HH:mm' });
                    $("#tbNewsKeyWords").tagsinput();
                    $(".page-content").LoadingOverlay("hide", true);
                    $("#cbIsInHome").change(function () {
                        if ($(this).is(':checked')) {
                            $("#ddlHomePosition").closest(".formElement").show();
                        }
                        else {
                            $("#ddlHomePosition").closest(".formElement").hide();
                        }
                    });
                });
            }, 100);
        });
    };
    var SaveNews = function () {
        $('#SaveNews').on("submit", function (event) {
            var form = this;
            gsDisablSubmitButton(form);
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "Keywords", value: $("#tbNewsKeyWords").val() });
            postData.push({ name: "HomePosition", value: $("#ddlHomePosition").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        newsDataTableUpdate();
                        $("#newsId").val(data.id);
                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                        $(".scroll-to-top").click();
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };

    var deleteNews = function () {
        $(".btnDeleteNews").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteNews',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                newsDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var newsSearchAutoComplete = function () {
        //if (!$('#txtNewsSearch').hasClass('tt-input')) {
        //    var catId = $("#tblNews").attr("data-categoryId");
        //    var news = new Bloodhound({
        //        datumTokenizer: function (d) { return d.tokens; },
        //        queryTokenizer: Bloodhound.tokenizers.whitespace,
        //        remote: {
        //            url: '/ControlPanel/SearchAutoCompleteNews',
        //            replace: function (url, uriEncodedQuery) {
        //                return url + "/" + uriEncodedQuery + "?categoryId=" + catId;
        //            }
        //        }
        //    });
        //    news.initialize();

        //    $('#txtNewsSearch').typeahead({
        //        hint: true,
        //        highlight: true,
        //        minLength: 1,
        //        dir: true
        //    }, {
        //            name: 'search-news',
        //            displayKey: 'Title',
        //            source: news.ttAdapter(),
        //            limit: 20,
        //            dir: true,
        //            templates: {
        //                empty: [
        //                    '<div class="empty-message">',
        //                    '' + Messages.noResultFound + '',
        //                    '</div>'
        //                ].join('\n'),
        //                suggestion: Handlebars.compile([
        //                    '<div class="media">',
        //                    '<div class="pull-left">',
        //                    '<div class="media-object">',
        //                    '</div>',
        //                    '</div>',
        //                    '<div class="media-body">',
        //                    ' ',
        //                    ' <h5 class="media-heading">{{Title}} </h5>',
        //                    '</div>',
        //                    '</div>',
        //                ].join(''))
        //            },

        //        }).on('typeahead:selected', function ($e, datum) {
        //            $("#txtNewsSearch").attr('data-id', datum.Id);
        //        });
        //}
    };
    var newsSearch = function () {
        $("#btnSearch").off('click').click(function () {
            newsDataTableUpdate();
        });
    };
    var resetNewsDataTable = function () {
        $("#btnClearForm").off("click").click(function () {
            $("#txtNewsSearch").removeAttr("data-id");
            $("#ddlNewsCategory").val("0");
            $("#txtNewsSearch").val("");
            gsResetInsertForm("SearchForm");
            newsDataTableUpdate();
        });
    };
    /********Category**********/
    var categoriesDataTable = function () {
        $('#tblCategories').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "paging": false,
            "info": false,
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/getNewsCategoriesDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[2, 'asc']],
            //"fnServerParams": function (aoData) {
            //    aoData.push({ "name": "Name", "value": $("#txtNewsSearch").val() },
            //        { "name": "NewsTypeId", "value": $("#ddlNewsType").val() });
            //},
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '45%', "mDataProp": "NameAr", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '45%', "mDataProp": "NameEn", "bSortable": false },
                { "sType": "html", "sWidth": '10%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(2)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSaveCategory" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteCategory" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                $(nRow).dblclick(function () {
                    saveCategoryModel($(this).find(".btnSaveCategory").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveCategoryModal();
                deleteCategory();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var categoriesDataTableUpdate = function () {
        var oTable = $('#tblCategories').dataTable();
        oTable.fnDraw(false);
    };
    var saveCategoryModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveCategoryModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                saveCategory();
            });
        }, 100);
    }
    var getSaveCategoryModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveCategory").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveCategoryModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveCategory();
                });
            }, 100);
        });
    };
    var saveCategory = function () {
        $('#SaveCategoryForm').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        categoriesDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var deleteCategory = function () {
        $(".btnDeleteCategory").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteCategory',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                categoriesDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    /************/
    var AlbumsDataTable = function () {
        $('#tblAlbums').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/getAlbumsDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-12"p>><"clear">',
            "aaSorting": [[3, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "Id", "value": $("#txtAlbumSearch").attr("data-id") });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '10%', "mDataProp": "Thumbinal", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '45%', "mDataProp": "NameAr", "bSortable": false },
                { "sType": "html", "sWidth": '45%', "mDataProp": "NameEn", "bSortable": false },
                { "sType": "html", "sWidth": '10%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(3)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveAlbum" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnUploadImages" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.uploadImages + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteAlbum" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                $('td:eq(0)', nRow).html('<img  style="width: 100px;" alt="" src="/Content/UploadedFile/Albums/Thumbnail/' + aData.Thumbinal + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Albums/Thumbinal/NoImage.png\';"/>');

                $(nRow).dblclick(function () {
                    SaveAlbumsModel($(this).find(".btnSaveAlbum").attr("data-id"), $("#basicModal"));
                });
                $(nRow).off("click").click(function () {
                    $("#hdAlbumId").val(aData.Id);
                    mediaDataTableUpdateWithReSort();
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveAlbumsModal();
                deleteAlbum();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var AlbumsDataTableUpdate = function () {
        var oTable = $('#tblAlbums').dataTable();
        oTable.fnDraw(false);
    };
    var SaveAlbumsModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveAlbumsModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                saveAlbum();
                uploadAlbums();
            });
        }, 100);
    }
    var getSaveAlbumsModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveAlbum").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveAlbumsModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveAlbum();
                    uploadAlbums();
                });
            }, 100);
        });
    };
    var saveAlbum = function () {
        $('#SaveAlbumForm').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        AlbumsDataTableUpdate();
                        gsResetInsertForm(form);
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteAlbum = function () {
        $(".btnDeleteAlbum").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteAlbum',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                AlbumsDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var albumSearchAutoComplete = function () {
        if (!$('#txtAlbumSearch').hasClass('tt-input')) {
            var album = new Bloodhound({
                datumTokenizer: function (d) { return d.tokens; },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/ControlPanel/SearchAutoCompleteAlbum/%QUERY',
                    wildcard: '%QUERY'
                }
            });
            album.initialize();

            $('#txtAlbumSearch').typeahead({
                hint: true,
                highlight: true,
                minLength: 1,
                dir: true
            }, {
                    name: 'search-album',
                    displayKey: 'NameAr',
                    source: album.ttAdapter(),
                    limit: 20,
                    dir: true,
                    templates: {
                        empty: [
                            '<div class="empty-message">',
                            '' + Messages.noResultFound + '',
                            '</div>'
                        ].join('\n'),
                        suggestion: Handlebars.compile([
                            '<div class="media">',
                            '<div class="pull-left">',
                            '<div class="media-object">',
                            '</div>',
                            '</div>',
                            '<div class="media-body">',
                            ' ',
                            ' <h5 class="media-heading">{{NameAr}} </h5>',
                            '</div>',
                            '</div>',
                        ].join(''))
                    },

                }).on('typeahead:selected', function ($e, datum) {
                    $("#txtAlbumSearch").attr('data-id', datum.Id);
                });
        }
    };
    var albumSearch = function () {
        $("#btnSearch").off('click').click(function () {
            AlbumsDataTableUpdate();
        });
    };
    var resetAlbumDataTable = function () {
        $("#btnClearForm").off("click").click(function () {
            $("#txtAlbumSearch").removeAttr("data-id");
            $("#txtAlbumSearch").val("");
            AlbumsDataTableUpdate();
        });
    };
    /***********/
    var attachmentsDataTable = function () {
        $('#tblAttachments').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/getAttachmentsDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[5, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "Id", "value": $("#txtAttachmentSearch").attr("data-Id") },
                    { "name": "Type", "value": $("#ddlType").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '5%', "mDataProp": "Icon", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ?  "NameAr" : "NameEn" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "FileDescription" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "InsertedDate", "bSortable": false },
                { "sType": "html", "sWidth": '20%', "mDataProp": "UserName" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(5)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSaveAttachment" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteAttachment" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="/Content/UploadedFile/Attachments/' + aData.FileName + '" download="' + aData.FileName + '" "target="_blank"  class="lnk btnDeleteAttachment" data-id ="' + aData.Id + '"><i class="fa fa-download fa-fw"></i> تحميل</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(0)', nRow).html('<i style="font-size:40px;line-height: 40px" class="' + aData.Icon + '"><i/>');
                    //$('td:eq(1)', nRow).html('<span>' + aData.NameAr + '-' + aData.NameEn + '</span>');
                
                $(nRow).dblclick(function () {
                    SaveAttachmentModel($(this).find(".btnSaveAttachment").attr("data-id"), $("#basicModal"));

                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveAttachmentModal();
                deleteAttachment();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var attachmentsDataTableUpdate = function () {
        var oTable = $('#tblAttachments').dataTable();
        oTable.fnDraw(false);
    };
    var SaveAttachmentModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveAttachmentModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                saveAttachment();
                uploadFile();
            });
        }, 100);
    }
    var getSaveAttachmentModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveAttachment").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveAttachmentModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveAttachment();
                    uploadFile();

                });
            }, 100);
        });
    };
    var saveAttachment = function () {
        $('#SaveAttachmentForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        attachmentsDataTableUpdate();

                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteAttachment = function () {
        $(".btnDeleteAttachment").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteAttachment',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                attachmentsDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var attachmentSearchAutoComplete = function () {
        if (!$('#txtAttachmentSearch').hasClass('tt-input')) {
            var attachment = new Bloodhound({
                datumTokenizer: function (d) { return d.tokens; },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/ControlPanel/SearchAutoCompleteAttachment/%QUERY',
                    wildcard: '%QUERY'
                }
            });
            attachment.initialize();

            $('#txtAttachmentSearch').typeahead({
                hint: true,
                highlight: true,
                minLength: 1,
                dir: true
            }, {
                    name: 'search-attachment',
                    displayKey: 'FileDescription',
                    source: attachment.ttAdapter(),
                    limit: 20,
                    dir: true,
                    templates: {
                        empty: [
                            '<div class="empty-message">',
                            '' + Messages.noResultFound + '',
                            '</div>'
                        ].join('\n'),
                        suggestion: Handlebars.compile([
                            '<div class="media">',
                            '<div class="pull-left">',
                            '<div class="media-object">',
                            '</div>',
                            '</div>',
                            '<div class="media-body">',
                            ' ',
                            ' <h5 class="media-heading">{{FileDescription}} </h5>',
                            '</div>',
                            '</div>',
                        ].join(''))
                    },

                }).on('typeahead:selected', function ($e, datum) {
                    $("#txtAttachmentSearch").attr('data-id', datum.Id);
                });
        }
    };
    var attachmentSearch = function () {
        $("#btnSearch").off('click').click(function () {
            attachmentsDataTableUpdate();
        });
    };
    var resetAttachmentsDataTable = function () {
        $("#btnClearForm").off("click").click(function () {
            $("#txtAttachmentSearch").removeAttr("data-id");
            gsResetInsertForm("SearchForm");
            attachmentsDataTableUpdate();
        });
    };
    /************/
    var StaticPagesDataTable = function () {
        $('#tblStaticPages').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/getStaticPagesDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t><"clear">',
            "aaSorting": [[3, 'asc']],
            //"fnServerParams": function (aoData) {
            //    aoData.push({ "name": "Name", "value": $("#txtNewsSearch").val() },
            //        { "name": "NewsTypeId", "value": $("#ddlNewsType").val() });
            //},
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '15%', "mDataProp": "Image", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '35%', "mDataProp": "PageNameAr", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '35%', "mDataProp": "PageNameEn", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(3)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSaveStaticPage" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeletebtnSaveStatic" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(0)', nRow).html('<img  style="width: 200px;" alt="" src="/Content/UploadedFile/News/Thumbnail/' + aData.Image + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Account/Avatar/NoImage.png\';"/>');
                
                $(nRow).dblclick(function () {
                    saveStaticPagesModel($(this).find(".btnSaveStaticPage").attr("data-id"), $("#SaveModal"));

                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveStaticPagesModal();
                //deleteNewsAccount();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var StaticPagesDataTableUpdate = function () {
        var oTable = $('#tblStaticPages').dataTable();
        oTable.fnDraw(false);
    };
    var saveStaticPagesModel = function (id, bsModal) {
        bsModal.html('');
        $(".page-content").LoadingOverlay("show");
        setTimeout(function () {
            bsModal.load('/ControlPanel/SaveStaticPageModal?id=' + id, '', function () {
                $(".contentDiv").show();
                $(".tableDiv").hide();
                handleSummernote();
                closeModal();
                uploadImg($("#imgUploadUser"), $("#hdImage"));
                $(".page-content").LoadingOverlay("hide", true);
                saveStaticPages();
            });
        }, 100);
    }
    var getSaveStaticPagesModal = function () {
        var bsModal = $("#SaveModal");
        $(".btnSaveStaticPage").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            $(".page-content").LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load('/ControlPanel/SaveStaticPageModal?id=' + id, '', function () {
                    $(".contentDiv").show();
                    $(".tableDiv").hide();
                    handleSummernote();
                    closeModal();
                    uploadImg($("#imgUploadUser"), $("#hdImage"));
                    $(".page-content").LoadingOverlay("hide", true);
                    saveStaticPages();
                });
            }, 100);
        });
    };
    var saveStaticPages = function () {
        $('#SaveStaticPageForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        StaticPagesDataTableUpdate();
                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                        $(".scroll-to-top").click();
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    /********************/
    var intiDropZone = function () {
        $("#dropZoneImages").dropzone({
            maxFilesize: 700,
            sending: function (file, xhr, data) {
                data.append('albumId', $("#ddlMediaAlbumId").val());
            },
            queuecomplete: function (file, response) {
                gsNotifyMsg("تم رفع الصور بنجاح", "success");
                mediaDataTableUpdate();
            }

        });
    };
    var ddlAlbumChange = function () {
        $("#ddlMediaAlbumId").change(function () {
            $(".dropz").show();
        });
    };
    var mediaDataTable = function () {
        $('#tblMedia').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetMediasDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[4, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "AlbumId", "value": $("#hdAlbumId").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '25%', "mDataProp": "FilePath", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "MediaTypeAr" : "MediaTypeEn", "bSortable": false },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "CaptionAr" : "CaptionEn" },
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "AlbumAr" : "AlbumEn", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(4)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSaveMedia" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteMedia" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');

                    //$('td:eq(1)', nRow).html('<span>' + aData.MediaTypeAr + '-' + aData.MediaTypeEn + '</span>');
                    //$('td:eq(3)', nRow).html('<span>' + aData.AlbumAr + '-' + aData.AlbumEn + '</span>');
                if (aData.MediaType === 11) {
                    $('td:eq(0)', nRow).html('<a class="colorBox" href="/Content/UploadedFile/Albums/Large/' + aData.FilePath + ' "><img  style="width: 150px;" alt="" src="/Content/UploadedFile/Albums/Thumbnail/' + aData.FilePath + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Albums/Thumbinal/NoImage.png\';"/></a>');
                }
                else if (aData.MediaType === 12) {
                    $('td:eq(0)', nRow).html('<a class="colorBoxVideoSound " href="' + convertToEmbed(aData.ExternalLink) + ' "><img  style="width: 150px;" alt="" src="https://img.youtube.com/vi/' + getVideoId(aData.ExternalLink) + '/0.jpg" onError="this.onerror=null;this.src=\'/Content/UploadedFile/Albums/Thumbinal/NoImage.png\';"/></a>');

                } else if (aData.MediaType === 13) {
                    $('td:eq(0)', nRow).html('<a class="colorBoxVideoSound" href="' + aData.ExternalLink + ' "><img  style="width: 150px;" alt="" src="https://pmcvariety.files.wordpress.com/2015/08/soundcloud-logo.jpg" onError="this.onerror=null;this.src=\'/Content/UploadedFile/Albums/Thumbinal/NoImage.png\';"/></a>');
                }
                $(nRow).dblclick(function () {
                    SaveMediaModel($(this).find(".btnSaveMedia").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveMediaModal();
                deleteMedia();
                $(".colorBox").colorbox({ photo: true });
                $(".colorBoxVideoSound").colorbox({ iframe: true, innerWidth: 640, innerHeight: 390 });

            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var mediaDataTableUpdate = function () {
        var oTable = $('#tblMedia').dataTable();
        oTable.fnDraw(false);
    };
    var mediaDataTableUpdateWithReSort = function () {
        var oTable = $('#tblMedia').dataTable();
        oTable.fnDraw(true);
    };
    var SaveMediaModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveMediaModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                saveMedia();
                uploadAlbums();
                intiDropZone();
                ddlAlbumChange();

                handelChangeType();
            });
        }, 100);
    }
    var getSaveMediaModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveMedia").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveMediaModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveMedia();
                    uploadAlbums();
                    intiDropZone();
                    ddlAlbumChange();
                    handelChangeType();
                });
            }, 100);
        });
    };
    var saveMedia = function () {
        $('#SaveMediaForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        mediaDataTableUpdate();


                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteMedia = function () {
        $(".btnDeleteMedia").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteMedia',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                mediaDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var handelChangeType = function () {
        $("select.ddlMediaType").on("change", function () {
            var vl = $(this).val();
            if (vl === "11") {
                $(".divExternalLink").hide();
                $(this).closest(".row").find(".imageDiv").show();
                $(this).closest(".mediaDiv").removeClass("col-md-12").addClass("col-md-7");
            }
            else {
                $(".divExternalLink").show();
                $(this).closest(".row").find(".imageDiv").hide();
                $(this).closest(".mediaDiv").removeClass("col-md-7").addClass("col-md-12");
            }
        });
    };
    /**********************/
    var adsDataTable = function () {
        $('#tblAds').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetAdssDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[5, 'asc']],
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '15%', "mDataProp": "FilePath", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "StartDate" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "EndDate" },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "NameAr" : "NameEn" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "IsActive" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(5)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSaveAds" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteAds" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    if (aData.Ext === "swf") {
                        $('td:eq(0)', nRow).html('<a class="colorBoxVideoSound" href="/Content/UploadedFile/Attachments/' + aData.FilePath + '"><object width="150" height="100"><param name="" value="/Content/UploadedFile/Attachments/' + aData.FilePath + '"><embed src="/Content/UploadedFile/Attachments/' + aData.FilePath + '" width="150" height="100"></embed></object></a>');
                    }
                    else {
                        $('td:eq(0)', nRow).html('<a class="colorBox" href="/Content/UploadedFile/Attachments/' + aData.FilePath + '"><img  style="width: 150px;" alt="" src="/Content/UploadedFile/Attachments/' + aData.FilePath + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Albums/Thumbinal/NoImage.png\';"/></a>');
                    }
                    if (aData.IsActive === true) {
                        $('td:eq(4)', nRow).html("<span class='font-green-meadow fa fa-fw fa-check-circle-o fa-lg'></span>");
                    } else {
                        $('td:eq(4)', nRow).html("<span class='font-red-thunderbird fa fa-fw fa-times-circle-o fa-lg'></span>");
                    }
                    //$('td:eq(3)', nRow).html('<span>' + aData.NameAr + '-' + aData.NameEn + '</span>');
                $(nRow).dblclick(function () {
                    SaveAdsModel($(this).find(".btnSaveAds").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveAdsModal();
                deleteAds();
                $(".colorBox").colorbox({ photo: true });
                $(".colorBoxVideoSound").colorbox({ iframe: true, innerWidth: 640, innerHeight: 390 });
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var adsDataTableUpdate = function () {
        var oTable = $('#tblAds').dataTable();
        oTable.fnDraw(false);
    };
    var SaveAdsModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveAdsModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                saveAds();
                uploadFile();
                handleDatePickers();
            });
        }, 100);
    }
    var getSaveAdsModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveAds").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveAdsModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveAds();
                    uploadFile();
                    handleDatePickers();
                });
            }, 100);
        });
    };
    var saveAds = function () {
        $('#SaveAdsForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        adsDataTableUpdate();

                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteAds = function () {
        $(".btnDeleteAds").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteAds',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                adsDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    /*****************/
    var importantLinksDataTable = function () {
        $('#tblImportantLinks').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetImportantLinkssDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[3, 'asc']],
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '10%', "mDataProp": "Image", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '80%', "mDataProp": "Name" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "IsActive" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(3)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSaveImportantLinks" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteImportantLinks" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(1)', nRow).html("<a target='_blank' href='" + aData.Link + "'>" + aData.Name + "</a>");
                    $('td:eq(0)', nRow).html('<img  style="width: 100px;" alt="" src="/Content/UploadedFile/Albums/Thumbnail/' + aData.Image + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Albums/Thumbinal/NoImage.png\';"/>');
                
                if (aData.IsActive === true) {
                    $('td:eq(2)', nRow).html("<span class='font-green-meadow fa fa-fw fa-check-circle-o fa-lg'></span>");
                } else {
                    $('td:eq(2)', nRow).html("<span class='font-red-thunderbird fa fa-fw fa-times-circle-o fa-lg'></span>");
                }
                $(nRow).dblclick(function () {
                    SaveImportantLinksModel($(this).find(".btnSaveImportantLinks").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveImportantLinksModal();
                deleteImportantLinks();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var importantLinksDataTableUpdate = function () {
        var oTable = $('#tblImportantLinks').dataTable();
        oTable.fnDraw(false);
    };
    var SaveImportantLinksModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveImportantLinksModal?id=' + id, '', function () {
                bsModal.modal('show');
                saveImportantLinks();
                uploadAlbums();
            });
        }, 100);
    }
    var getSaveImportantLinksModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveImportantLinks").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveImportantLinksModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    saveImportantLinks();
                    uploadAlbums();
                });
            }, 100);
        });
    };
    var saveImportantLinks = function () {
        $('#SaveImportantLinksForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        importantLinksDataTableUpdate();

                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteImportantLinks = function () {
        $(".btnDeleteImportantLinks").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteImportantLinks',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                importantLinksDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    /*****************/
    var saveSN = function () {
        $('#btnAdd').off('click').click(function () {
            var lst = [];
            $.each($(".social"), function (indexh, cb) {

                var Social = {
                    Id: $(cb).attr('SID'),
                    Link: $(cb).val()

                }
                lst.push(Social);
            });

            var str = JSON.stringify(lst, null, 2);
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: '/ControlPanel/UpdateSocial',
                data: { 'str': str },
                success: function (data) {
                    if ($('.jquery-notific8-notification').length > 0) {
                        $('.jquery-notific8-notification').remove();
                    }
                    gsNotifyMsg(data.cMsg, data.cStatus);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if ($('.jquery-notific8-notification').length > 0) {
                        $('.jquery-notific8-notification').remove();
                    }
                    gsNotifyMsg('حدث خطأ ما! , الرجاء المحاولة ثانية', 'error');
                }
            });


        });
    }

    var appSettingsDataTable = function () {
        $('#tblAppSettings').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/ControlPanel/getAppSettingsDataTable",
            "bProcessing": true,
            "dom": '<"clear">',
            "aaSorting": [[2, 'asc']],
            //"fnServerParams": function (aoData) {
            //    aoData.push({ "name": "Id", "value": $("#txtAppSettingsSearch").attr("data-Id") },
            //        { "name": "Type", "value": $("#ddlType").val() });
            //},
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '10%', "mDataProp": "KeyNameAr", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '15%', "mDataProp": "ValueNameAr" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "ConKey", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(2)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnViewAppSettings" data-id="' + aData.ConKey + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(0)', nRow).html(joinString(aData.KeyNameAr, aData.KeyNameEn));
                    $('td:eq(1)', nRow).html(joinString(aData.ValueNameAr, aData.ValueNameEn));
                $(nRow).dblclick(function () {
                    saveAppSettingsModel($(this).find(".btnViewAppSettings").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveAppSettingsModal();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var appSettingsDataTableUpdate = function () {
        var oTable = $('#tblAppSettings').dataTable();
        oTable.fnDraw(false);
    };
    var saveAppSettingsModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load('/ControlPanel/SaveAppSettingsModal?id=' + id, '', function () {
                bsModal.modal('show');
                saveAppSettings();
                handleBootstrapSelect();

            });
        }, 100);
    }
    var getSaveAppSettingsModal = function () {
        var bsModal = $("#basicModal");
        $(".btnViewAppSettings").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load('/ControlPanel/SaveAppSettingsModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    saveAppSettings();
                    handleBootstrapSelect();

                });
            }, 100);
        });
    };
    var saveAppSettings = function () {
        $('#SaveAppSettingsForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        appSettingsDataTableUpdate();
                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    /***************/
    var agendasDataTable = function () {
        $('#tblAgenda').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/getAgendaDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[5, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push(
                    { "name": "Id", "value": $("#txtAgendaSearch").attr("data-Id") },
                    { "name": "Type", "value": $("#ddlType").val() },
                    { "name": "FromDate", "value": $("#tbsFromDate").val() },
                    { "name": "ToDate", "value": $("#tbsToDate").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '5%', "mDataProp": "Image", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "Name" : "NameEn" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "Type", "bSortable": false },
                { "sType": "html", "sWidth": '25%', "mDataProp": "FromDate", "bSortable": false },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "Place" : "PlaceEn" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {


                $('td:eq(5)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveAgenda" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteAgenda" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="/Content/UploadedFile/Agenda/' + aData.FileName + '" download="' + aData.FileName + '" "target="_blank"  class="lnk btnDeleteAgenda" data-id ="' + aData.Id + '"><i class="fa fa-download fa-fw"></i> تحميل</a>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                $('td:eq(0)', nRow).html('<img  style="width: 100px;" alt="" src="/Content/UploadedFile/Albums/Thumbnail/' + aData.Image + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Account/Avatar/NoImage.png\';"/>');
                //$('td:eq(1)', nRow).html(joinString(aData.Name, aData.NameEn));
                //$('td:eq(4)', nRow).html(joinString(aData.Place, aData.PlaceEn));
                $('td:eq(3)', nRow).html(joinString(aData.FromDate, aData.ToDate));

                $(nRow).dblclick(function () {
                    SaveAgendaModel($(this).find(".btnSaveAgenda").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveAgendaModal();
                deleteAgenda();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var agendasDataTableUpdate = function () {
        var oTable = $('#tblAgenda').dataTable();
        oTable.fnDraw(false);
    };
    var searchAgendas = function () {
        $("#btnSearch").off("click").click(function () {
            agendasDataTableUpdate();
        });
    };
    var resetAgendas = function () {
        $("#btnClearForm").off("click").click(function () {
            $("#tbSearch").removeAttr("data-id");
            gsResetInsertForm("SearchForm");
            agendasDataTableUpdate();
        });
    };
    var SaveAgendaModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveAgendaModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                saveAgenda();
                uploadAlbums();
                handleDatePickers();
            });
        }, 100);
    }
    var getSaveAgendaModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveAgenda").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveAgendaModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveAgenda();
                    uploadAlbums();
                    handleDatePickers();
                });
            }, 100);
        });
    };
    var saveAgenda = function () {
        $('#SaveAgendaForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "Sports", value: $("#ddlSports").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        agendasDataTableUpdate();

                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteAgenda = function () {
        $(".btnDeleteAgenda").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteAgenda',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                agendasDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var agendasSearchAutoComplete = function () {
        if (!$('#tbSearch').hasClass('tt-input')) {
            var tournament = new Bloodhound({
                datumTokenizer: function (d) { return d.tokens; },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/ControlPanel/SearchAutoCompleteAgenda/%QUERY',
                    wildcard: '%QUERY'
                }
            });
            tournament.initialize();
            $('#tbSearch').typeahead({
                hint: true,
                highlight: true,
                minLength: 1,
                dir: true
            }, {
                name: 'search-course',
                displayKey: 'Name',
                source: tournament.ttAdapter(),
                limit: 20,
                dir: true,
                templates: {
                    empty: [
                        '<div class="empty-message">',
                        '' + Messages.noResultFound + '',
                        '</div>'
                    ].join('\n'),
                    suggestion: Handlebars.compile([
                        '<div class="media">',
                        '<div class="pull-left">',
                        '<div class="media-object">',
                        '</div>',
                        '</div>',
                        '<div class="media-body">',
                        ' ',
                        ' <h5 class="media-heading">{{Name}}-{{NameEn}} </h5>',
                        '</div>',
                        '</div>'
                    ].join(''))
                }
            }).on('typeahead:selected', function ($e, datum) {
                $("#tbSearch").attr('data-id', datum.Id);
            });
        }
    };
    /***************/
    /***************/
    var disciplinessDataTable = function () {
        $('#tblDisciplines').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetDisciplinesDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[3, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "Id", "value": $("#txtDisciplinesSearch").attr("data-Id") },
                    { "name": "Type", "value": $("#ddlTypes").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "NameAr" : "NameEn", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "ParentNameAr" : "ParentNameEn" },
                { "sType": "html", "sWidth": '45%', "mDataProp": lang === "ar" ? "DescriptionAr" : "DescriptionEn", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {


                $('td:eq(3)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSavedisciplines" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeletedisciplines" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                //$('td:eq(0)', nRow).html(joinString(aData.NameAr, aData.NameEn));
                //$('td:eq(1)', nRow).html(joinString(aData.ParentNameAr, aData.ParentNameEn));

                $(nRow).dblclick(function () {
                    saveDisciplinesModel($(this).find(".btnSavedisciplines").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveDisciplinesModal();
                deleteDisciplines();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var disciplinessDataTableUpdate = function () {
        var oTable = $('#tblDisciplines').dataTable();
        oTable.fnDraw(false);
    };
    var disciplinesSearch = function () {
        $("#btnSearch").off('click').click(function () {
            disciplinessDataTableUpdate();
        });
    };
    var resetDisciplinesDataTable = function () {
        $("#btnClearForm").off("click").click(function () {
            $("#txtDisciplinesSearch").removeAttr("data-id");
            gsResetInsertForm("SearchForm");
            disciplinessDataTableUpdate();
        });
    };
    var saveDisciplinesModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveDisciplineModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                saveDisciplines();
            });
        }, 100);
    }
    var getSaveDisciplinesModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveDiscipline").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveDisciplineModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveDisciplines();
                });
            }, 100);
        });
    };
    var saveDisciplines = function () {
        $('#SaveDisciplineForm').submit(function () {

            var form = this;
            BlockForm(form);
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        disciplinessDataTableUpdate();
                        gsResetInsertForm("SaveDisciplineForm");
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteDisciplines = function () {
        $(".btnDeletedisciplines").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteDiscipline',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                disciplinessDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var disciplinesSearchAutoComplete = function () {
        if (!$('#txtDisciplinesSearch').hasClass('tt-input')) {
            var items = new Bloodhound({
                datumTokenizer: function (d) { return d.tokens; },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/ControlPanel/DisciplinesSearchAutoComplete/%QUERY',
                    wildcard: '%QUERY'
                }
            });

            items.initialize();

            $('#txtDisciplinesSearch').typeahead({
                hint: true,
                highlight: true,
                minLength: 1,

            }, {
                    name: 'search-items',
                    displayKey: 'NameAr',
                    source: items.ttAdapter(),
                limit: 30,
                templates: {
                    empty: [
                        '<div class="empty-message">',
                        '' + Messages.noResultFound + '',
                        '</div>'
                    ].join('\n'),
                    suggestion: Handlebars.compile([
                        '<div class="media">',
                        '<div class="pull-left">',
                        '<div class="media-object">',
                        '</div>',
                        '</div>',
                        '<div class="media-body">',
                        ' ',
                        ' <h5 class="media-heading">{{NameAr}}</h5>',
                        '</div>',
                        '</div>',
                    ].join(''))
                },

            }).on('typeahead:selected', function ($e, datum) {
                $("#txtDisciplinesSearch").attr('data-id', datum.Id);
            });
        }
    };
    /*****************/
    var playersInNewsSiteDataTable = function () {
        $('#tblPlayersInNewsSite').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetPlayersInNewsSiteDataTable",
            "bPaginate": false,
            "dom": 'lfrti',
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "MemberId", "value": $("#tbMemberId").attr("data-accountId") });
            },
            "info": false,
            "aaSorting": [[4, 'asc']],
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '10%', "mDataProp": "Avatar", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '35%', "mDataProp": lang === "ar" ? "FullNameAr" : "FullNameEn" },
                { "sType": "html", "sWidth": '30%', "mDataProp": "FromDate" },
                { "sType": "html", "sWidth": '10%', "mDataProp": "Fixed", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(4)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSavePlayersInNewsSite" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeletePlayersInNewsSite" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                //$('td:eq(1)', nRow).html(joinString(aData.FullNameAr, aData.FullNameEn));
                $('td:eq(2)', nRow).html(joinString(aData.FromDate, aData.ToDate));
                $('td:eq(0)', nRow).html('<img  style="width: 100px;" alt="" src="/Content/UploadedFile/Account/Avatar/Thumbnail/' + aData.Avatar + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Account/Avatar/NoImage.png\';"/>');
                if (aData.Fixed === true) {
                    $('td:eq(3)', nRow).html("<span class='font-green-meadow fa fa-fw fa-check-circle-o fa-lg'></span>");
                } else {
                    $('td:eq(3)', nRow).html("<span class='font-red-thunderbird fa fa-fw fa-times-circle-o fa-lg'></span>");
                }
                $(nRow).dblclick(function () {
                    SavePlayersInNewsSiteModel($(this).find(".btnSavePlayersInNewsSite").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSavePlayersInNewsSiteModal();
                deletePlayersInNewsSite();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var playersInNewsSiteDataTableUpdate = function () {
        var oTable = $('#tblPlayersInNewsSite').dataTable();
        oTable.fnDraw(false);
    };
    var getSavePlayersInNewsSiteModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSavePlayersInNewsSite").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SavePlayersInNewsSiteModal/' + id, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    memberSearchAutoComplete(54);
                    handleDatePickers();
                    savePlayersInNewsSite();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var SavePlayersInNewsSiteModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SavePlayersInNewsSiteModal/' + id, '', function () {
                bsModal.modal('show');
                if (status === "error") {
                    var msg = "Sorry but there was an error : ";
                    bsModal.html(msg + xhr.status + " " + xhr.statusText);
                }
                memberSearchAutoComplete(54);
                handleDatePickers();
                savePlayersInNewsSite();
                resetbooststrapSelect();
                handleBootstrapSelect();
            });
        }, 300);
    }
    var savePlayersInNewsSite = function () {
        $('#SavePlayersInNewsSite').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "PlayerId", value: $("#tbMemberName").attr("data-id") });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        playersInNewsSiteDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var deletePlayersInNewsSite = function () {
        $(".btnDeletePlayersInNewsSite").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeletePlayersInNewsSite',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                playersInNewsSiteDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    /***************/
    var clubsDataTable = function () {
        $('#tblClubs').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetClubsDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[7, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "ClubId", "value": $("#txtClubSearch").attr("data-Id") });
                aoData.push({ "name": "CityId", "value": $("#ddlCities").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '10%', "mDataProp": "UserAvatar", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ?  "NameAr" : "NameEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "AddressAr", "bSortable": false },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "DestinationAr" : "DestinationEn", "bSortable": false },
                { "sType": "html", "sWidth": '10%', "mDataProp": "Phone", "bSortable": false },
                { "sType": "html", "sWidth": '10%', "mDataProp": "Mobile", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "InsertedDate", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(7)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSaveClubs" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteClubs" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnClubApproveStatment" data-id ="' + aData.Id + '" data-Managers ="' + (lang === "ar" ? aData.ManagersAr : aData.ManagersEn) + '" data-Statment ="' + aData.Notes + '"><i class="fa fa-check fa-fw"></i> ' + Messages.ApproveStatment + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(0)', nRow).html('<img  style="width: 100px;" alt="" src="/Content/UploadedFile/Account/Avatar/Thumbnail/' + aData.UserAvatar + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Account/Avatar/NoImage.png\';"/>');
                
                $(nRow).dblclick(function () {
                    saveClubsModal($(this).find(".btnSaveClubs").attr("data-id"), $("#SaveModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveClubsModal();
                getClubApproveStatmentModal();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var clubsDataTableUpdate = function () {
        var oTable = $('#tblClubs').dataTable();
        oTable.fnDraw(false);
    };
    var resetClubsDataTable = function () {
        $("#btnClearForm").off("click").click(function () {
            $("#txtClubSearch").removeAttr("data-id");
            gsResetInsertForm("SearchForm");
            clubsDataTableUpdate();
        });
    };
    var getClubApproveStatmentModal = function () {
        var bsModal = $("#basicModal");
        $(".btnClubApproveStatment").off('click').click(function () {
            var mangers = $(this).attr("data-Managers");
            var statment = $(this).attr("data-Statment");
            bsModal.html('');
            var html = '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>' +
                '<h4 class="modal-title"> ' + Messages.ApproveStatment + '  </h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<div class="form-horizontal ">' +
                '<div class="form-group">' +
                '<label class="col-md-4 control-label">' + Messages.ApproveCommittee + ': </label>' +
                '<label class="col-md-8 control-label" style="text-align: right;">' + (mangers !== "null" ? mangers : " ") + '</label>' +
                '</div>' +
                '<div class="form-group">' +
                '<label class="col-md-4 control-label">' + Messages.Statment + ': </label>' +
                '<label class="col-md-8 control-label" style="text-align: right;">' + (statment !== "null" ? statment : " ") + '</label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn dark btn-outline" data-dismiss="modal">' + Messages.Close + '</button>' +
                '</div>' +
                '</div>' +
                '</div>';
            setTimeout(function () {

                bsModal.html(html);
                bsModal.modal('show');

            },
                300);
        });
    };
    var clubsSearchAutoComplete = function () {
        if (!$('#txtClubSearch').hasClass('tt-input')) {
            var items = new Bloodhound({
                datumTokenizer: function (d) { return d.tokens; },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/ControlPanel/SearchAutoCompleteClubs/%QUERY',
                    wildcard: '%QUERY'
                }
            });

            items.initialize();

            $('#txtClubSearch').typeahead({
                hint: true,
                highlight: true,
                minLength: 1,

            }, {
                name: 'search-items',
                displayKey: 'NameAr',
                source: items.ttAdapter(),
                limit: 30,
                templates: {
                    empty: [
                        '<div class="empty-message">',
                        '' + Messages.noResultFound + '',
                        '</div>'
                    ].join('\n'),
                    suggestion: Handlebars.compile([
                        '<div class="media">',
                        '<div class="pull-left">',
                        '<div class="media-object">',
                        '</div>',
                        '</div>',
                        '<div class="media-body">',
                        ' ',
                        ' <h5 class="media-heading">{{NameAr}}</h5>',
                        '</div>',
                        '</div>',
                    ].join(''))
                },

            }).on('typeahead:selected', function ($e, datum) {
                $("#txtClubSearch").attr('data-id', datum.Id);
            });
        }
    };

    var getAddClubModal = function () {
        var bsModal = $("#basicModal");
        $(".btnAddClub").off('click').click(function () {
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang +'/ControlPanel/AddClubModal/', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    handleDatePickers();
                    uploadAvatar();
                    addClub();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var addClub = function () {
        $('#AddClub').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            //postData.push({ name: "UserTypeId", value: $("#ddlConClubType :selected").attr("data-usertype") });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        clubsDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };

    var saveClubsModal = function (id, bsModal) {
        bsModal.html('');
        $(".page-content").LoadingOverlay("show");
        setTimeout(function () {
            bsModal.load("/" + lang +'/ControlPanel/SaveClubsModal?id=' + id, '', function () {
                $(".contentDiv").show();
                $(".tableDiv").hide();
                resetbooststrapSelect();
                handleBootstrapSelect();
                closeModal();
                getClubMemberAchievementsModal();

                getClubFilesModal();
                getClubBasicInformationModal();
                getClubBoardOfDirectorsModal();
                getClubImagesModal();
                getLoginInfoModal();
                getMemberPenaltiesModal();
                uploadAvatar();
                $("#tabBasicInformation").click();
                $(".page-content").LoadingOverlay("hide", true);
            });
        }, 300);
    }
    var getSaveClubsModal = function () {
        var bsModal = $("#SaveModal");
        $(".btnSaveClubs").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            $(".page-content").LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang +'/ControlPanel/SaveClubsModal?id=' + id, '', function () {
                    $(".contentDiv").show();
                    $(".tableDiv").hide();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    closeModal();
                    getClubFilesModal();
                    getClubBasicInformationModal();
                    getClubBoardOfDirectorsModal();
                    getClubImagesModal();
                    getMemberPenaltiesModal();

                    $("#tabBasicInformation").click();
                    $(".page-content").LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var getClubBasicInformationModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabBasicInformation").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbClubId").val();
            bsModal.html('');
            $(".tab-content").LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang +'/ControlPanel/ClubBasicInformationModal/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    closeModal();
                    saveClubBasicInfo();
                    handleDatePickers();

                    $(".tab-content").LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var clubBoardOfDirectorsDataTable = function () {
        $('#tblClubBoardOfDirectors').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang +"/ControlPanel/GetClubBoardOfDirectorsDataTable",
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "ClubId", "value": $("#tbClubId").val() });
            },
            "bProcessing": true,
            "bPaginate": false,
            "dom": 'lfrti',
            "info": false,
            "aaSorting": [[4, 'asc']],
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "Name" : "NameEn", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "Phone", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "Email" },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "PositionNameAr" : "PositionNameEn", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                //$('td:eq(0)', nRow).html(joinString(aData.Name, aData.NameEn));
                //$('td:eq(3)', nRow).html(joinString(aData.PositionNameAr, aData.PositionNameEn));
                $('td:eq(4)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveClubBoardOfDirectors" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteClubBoardOfDirectors" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                $(nRow).dblclick(function () {
                    SaveClubBoardOfDirectorsModel($(this).find(".btnSaveClubBoardOfDirectors").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveClubBoardOfDirectorsModal();
                deleteClubBoardOfDirectors();
            },
            "bFilter": false
        });
    };
    var clubBoardOfDirectorsDataTableUpdate = function () {
        var oTable = $('#tblClubBoardOfDirectors').dataTable();
        oTable.fnDraw(false);
    };

    var SaveClubBoardOfDirectorsModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang +'/ControlPanel/SaveClubBoardOfDirectorsModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                saveClubBoardOfDirectors();
            });
        }, 100);
    }
    var getSaveClubBoardOfDirectorsModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveClubBoardOfDirectors").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang +'/ControlPanel/SaveClubBoardOfDirectorsModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveClubBoardOfDirectors();
                });
            }, 100);
        });
    };
    var saveClubBoardOfDirectors = function () {
        $('#SaveClubBoardOfDirectorsForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "ClubId", value: $("#tbClubId").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        clubBoardOfDirectorsDataTableUpdate();
                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteClubBoardOfDirectors = function () {
        $(".btnDeleteClubBoardOfDirectors").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteClubBoardOfDirectors',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                clubBoardOfDirectorsDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };


    var getClubBoardOfDirectorsModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabBoardOfDirectors").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbClubId").val();
            bsModal.html('');
            $(".tab-content").parent('div').LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang +'/ControlPanel/ClubBoardOfDirectors/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    closeModal();
                    clubBoardOfDirectorsDataTable();
                    $(".tab-content").parent('div').LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var getLoginInfoModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabLoginInfo").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbClubId").val();
            bsModal.html('');
            $(".tab-content").LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang +'/ControlPanel/ClubLoginInfo/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveClubLoginInfo();
                    closeModal();
                    $(".tab-content").LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var saveClubLoginInfo = function () {
        $('#SaveClubLoginInfo').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                        $(".scroll-to-top").click();
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var getClubImagesModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabImages").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbMemberId").attr("data-accountid");
            bsModal.html('');
            $(".tab-content").parent('div').LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang +'/ControlPanel/ClubImages/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    getSaveMemberClubImageModal(2);
                    closeModal();
                    initColorBox();
                    $(".tab-content").parent('div').LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var getClubFilesModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabFiles").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbMemberId").val();
            bsModal.html('');
            $(".tab-content").parent('div').LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang +'/ControlPanel/ClubFiles/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    getSaveMemberClubFileModal(2);
                    memberClubFilesDataTable(2);
                    closeModal();
                    $(".tab-content").parent('div').LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var saveClubBasicInfo = function () {
        $('#SaveClubBasicInfo').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        clubsDataTableUpdate();
                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                        $(".scroll-to-top").click();
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var clubsSearch = function () {
        $("#btnSearch").off('click').click(function () {
            clubsDataTableUpdate();
        });
    };


    var getClubMemberAchievementsModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabPlayerAchievements").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbClubId").val();
            bsModal.html('');
            $(".tab-content").parent('div').LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang +'/ControlPanel/ClubMembersAchievements/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    closeModal();
                    clubMeberAchievementsDataTable();
                    $(".tab-content").parent('div').LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var clubMeberAchievementsDataTable = function () {
        $('#tblAchievement').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang +"/ControlPanel/GetClubMemberAchievementsDataTable",
            "bProcessing": true,
            "bPaginate": false,
            "dom": 'lfrti',
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "ClubId", "value": $("#tbMemberId").val() });
            },
            "info": false,
            "aaSorting": [[6, 'asc']],
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "FullNameAr" : "FullNameEn" , "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "Occasion" : "OccasionEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "TitleAr" : "TitleEn", "bSortable": false, "sClass": "tdCenter" },
                //{ "sType": "html", "sWidth": '15%', "mDataProp": lang === "ar" ? "AwardPositionAr" : "AwardPositionEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "Date", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": lang === "ar" ? "Place" : "PlaceEn", "bSortable": false },
                { "sType": "html", "sWidth": '10%', "mDataProp": "AchType", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                //$('td:eq(2)', nRow).html(joinString(aData.Achievement, aData.AchievementEn));
                //$('td:eq(3)', nRow).html(joinString(aData.TitleAr, aData.TitleEn));
                //$('td:eq(5)', nRow).html(joinString(aData.Place, aData.PlaceEn));
                if (aData.AchType === 1) {
                    $('td:eq(6)', nRow).html('');
                    $('td:eq(5)', nRow).html('<span>' + Messages.External + '</span>');

                }
                if (aData.AchType === 2) {
                    $('td:eq(6)', nRow).html('');
                    $('td:eq(5)', nRow).html('<span>' + Messages.Internal +'</span>');
                }
                if (aData.AchType === 3) {
                    $('td:eq(6)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk  btnSaveExternalMemberAchievement" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteExternalMemberAchievement" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(5)', nRow).html('<span>' + Messages.PreviousPlayer +'</span>');
                }
                $(nRow).dblclick(function () {
                    if ($(this).find(".lnk").hasClass("btnSaveExternalMemberAchievement")) {
                        saveExternalMemberAchievementModal($(this).find(".btnSaveExternalMemberAchievement").attr("data-id"), $("#basicModal"));
                    }
                });

            },
            "fnDrawCallback": function (oSettings) {
                getSaveExternalMemberAchievementModal();
                //getSaveMemberOldAchievementModal();
                //deleteMemberOldAchievement();
                //deleteMemberAchievement();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var clubMemberAchievementsDataTableUpdate = function () {
        var oTable = $('#tblAchievement').dataTable();
        oTable.fnDraw(false);
    };
    var getSaveExternalMemberAchievementModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveExternalMemberAchievement").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang +'/ControlPanel/GetExternalMemberAchievementModal/' + id, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    handleDatePickers();
                    saveExternalMemberAchievement();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var saveExternalMemberAchievementModal = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang +'/ControlPanel/GetExternalMemberAchievementModal/' + id, '', function () {
                bsModal.modal('show');
                if (status === "error") {
                    var msg = "Sorry but there was an error : ";
                    bsModal.html(msg + xhr.status + " " + xhr.statusText);
                }
                handleDatePickers();
                saveExternalMemberAchievement();
                resetbooststrapSelect();
                handleBootstrapSelect();
            });
        }, 300);
    }
    var saveExternalMemberAchievement = function () {
        $('#SaveExternalMemberAchievement').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "ClubId", value: $("#tbClubId").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        clubMemberAchievementsDataTableUpdate();
                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                        $(".scroll-to-top").click();
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };


    var unApprovedClubsDataTable = function () {
        $('#tblClubs').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetUnApprovedClubsDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[0, 'asc']],
            "fnServerParams": function (aoData) {
                //aoData.push({ "name": "ClubId", "value": $("#txtClubsSearch").attr("data-Id") });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '10%', "mDataProp": "Id", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '10%', "mDataProp": "NameAr", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "AddressAr", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "Destination", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "Phone", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "Mobile", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "InsertedDate", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": lang === "ar" ? "StatusAr" : "StatusEn", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "UserAvatar", "sClass": "tdCenter", "bSortable": false }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                
                $('td:eq(8)', nRow).html('<label class="mt-checkbox" style="margin-left:0 !important;margin-right:0 !important;"> <input data-id="' + aData.Id + '" type="checkbox" class="cbSelect" value="0" /> <span></span></label>');
                $('td:eq(0)', nRow).html('<img  style="width: 200px;" alt="" src="/Content/UploadedFile/Account/Avatar/Thumbnail/' + aData.UserAvatar + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Account/Avatar/NoImage.png\';"/>');
                

            },
            "fnDrawCallback": function (oSettings) {
                getClubsChangeStatusModal();
                //getSaveClubsModal();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var unApprovedClubsDataTableUpdate = function () {
        var oTable = $('#tblClubs').dataTable();
        oTable.fnDraw(false);
    };
    var getClubsChangeStatusModal = function () {
        var bsModal = $("#basicModal");
        $("#btnApprove, #btnReject").off('click').click(function () {
            var statusId = $(this).attr("data-id");
            var clubs = "";

            $.each($("input[class='cbSelect']:checked"), function (index, item) {
                if (parseInt($(item).attr("data-id")) > 0)
                    clubs += $(item).attr("data-id") + ",";
            });
            clubs = clubs.substring(0, clubs.length - 1);
            if (clubs.length > 0) {
                bsModal.html('');
                setTimeout(function () {
                    bsModal.load("/" + lang + '/ControlPanel/ClubsChangeStatusModel?ids=' + clubs + "&statusId=" + statusId,
                        '',
                        function () {
                            bsModal.modal('show');
                            if (status === "error") {
                                var msg = "Sorry but there was an error : ";
                                bsModal.html(msg + xhr.status + " " + xhr.statusText);
                            }
                            resetbooststrapSelect();
                            handleBootstrapSelect();
                            clubsChangeStatus();
                        });
                },
                    300);
            }
        });
    };
    var clubsChangeStatus = function () {
        $('#SaveClubsStatus').off("click").click(function () {
            var statusId = $("#ConStatusId").val();
            var clubsIds = $("#ClubsIds").val();
            var managersIds = $("#ddlManagers").val().join(',');
            var notes = $("#Notes").val();
            if (managersIds.length > 0) {
                gsConfirm('هل انت متاكد من العملية  !!',
                    function (result) {
                        if (result) {
                            $.ajax({
                                type: "POST",
                                cache: false,
                                url: '/ControlPanel/ClubsChangeStatus',
                                data: {
                                    "ids": clubsIds,
                                    "statusId": statusId,
                                    "managersIds": managersIds,
                                    "notes": notes
                                },
                                dataType: "json",
                                success: function (data) {
                                    if (data.cStatus === "success") {
                                        completedSuccessfuly(data.cMsg);
                                        unApprovedClubsDataTableUpdate();
                                    } else if (data.cStatus === "notValid") {
                                        notValidOperations(data.cMsg);
                                    } else {
                                        notValidOperations(data.cMsg);
                                    }
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                                }
                            });
                        }
                    });
            }
        });
    };

    var memberSearchAutoComplete = function (typeId) {
        if (!$('#tbMemberName').hasClass('tt-input')) {
            var member = new Bloodhound({
                datumTokenizer: function (d) { return d.tokens; },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/ControlPanel/SearchAutoCompleteMember',
                    replace: function (url, uriEncodedQuery) {
                        return url + "/" + uriEncodedQuery + "?typeId=" + typeId;
                    }
                }
            });
            member.initialize();
            $('#tbMemberName').typeahead({
                hint: true,
                highlight: true,
                minLength: 1,
                dir: true
            }, {
                    name: 'search-member',
                    displayKey: 'FullNameAr',
                    source: member.ttAdapter(),
                    limit: 20,
                    dir: true,
                    templates: {
                        empty: [
                            '<div class="empty-message">',
                            '' + Messages.noResultFound + '',
                            '</div>'
                        ].join('\n'),
                        suggestion: Handlebars.compile([
                            '<div class="media">',
                            '<div class="pull-left">',
                            '<div class="media-object">',
                            '</div>',
                            '</div>',
                            '<div class="media-body">',
                            ' ',
                            ' <h5 class="media-heading">{{FullNameAr}}-{{FullNameEn}} </h5>',
                            '</div>',
                            '</div>'
                        ].join(''))
                    }
                }).on('typeahead:selected', function ($e, datum) {
                    $("#tbMemberName").attr('data-id', datum.UserId);
                });
        }
    };

    var expDate = function () {
        $("#tbPassportExpDate").datepicker({
            format: "mm-yyyy",
            viewMode: "months",
            minViewMode: "months",
            rtl: true,
            orientation: "right",
        });
    };
    var membersDataTable = function (type) {
        $('#tblMembers').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetMembersDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[7, 'desc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "MemberId", "value": $("#tbMemberName").attr("data-Id") },
                    { "name": "ConMemberType", "value": type });
            },

            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '10%', "mDataProp": "Avatar", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '10%', "mDataProp": lang === "ar" ? "FullNameAr" : "FullNameEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '10%', "mDataProp": lang === "ar" ? "ConMemberTypeAr" : "ConMemberTypeEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "ClubNameAr" : "ClubNameEn", "bSortable": false },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "DestinationAr" : "DestinationEn", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "Mobile", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "InsertedDate", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "UserId", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(7)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveMembers" data-id="' + aData.UserId + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteMembers" data-id ="' + aData.UserId + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnMemberSummary" data-id ="' + aData.UserId + '"><i class="fa fa-eye fa-fw"></i> ' + Messages.Summary + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnMemberApproveStatment" data-id ="' + aData.UserId + '" data-Managers ="' + (lang === "ar" ? aData.ManagersAr : aData.ManagersEn) + '" data-Statment ="' + aData.Notes + '"><i class="fa fa-check fa-fw"></i> ' + Messages.ApproveStatment + '</a>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                $('td:eq(0)', nRow).html('<img  style="width: 100px;" alt="" src="/Content/UploadedFile/Account/Avatar/Thumbnail/' + aData.Avatar + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Account/Avatar/NoImage.png\';"/>');
                $(nRow).dblclick(function () {
                    saveMembersModal($(this).find(".btnSaveMembers").attr("data-id"), $("#SaveModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveMemberModal();
                getMemberSummaryModal();
                getMemberApproveStatmentModal();
                //deleteMembers();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var membersDataTableUpdate = function () {
        var oTable = $('#tblMembers').dataTable();
        oTable.fnDraw(false);
    };
    var getAddMemberModal = function () {
        var bsModal = $("#basicModal");
        $(".btnAddMember").off('click').click(function () {
            var type = $(this).attr("data-memberType");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/AddMemberModal/' + type, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    handleDatePickers();
                    uploadAvatar();
                    addMember();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var addMember = function () {
        $('#AddMember').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "UserTypeId", value: $("#ddlConMemberType :selected").attr("data-usertype") });
            postData.push({ name: "Disciplines", value: $("#LstDiscipline").val() });
            //postData.push({ name: "ConMemberType", value: $("#ddlConMemberType").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        membersDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var resetMembersDataTable = function () {
        $("#btnClearForm").off("click").click(function () {
            $("#tbMemberName").removeAttr("data-id");
            gsResetInsertForm("SearchForm");
            membersDataTableUpdate();
        });
    };
    var getMemberApproveStatmentModal = function () {
        var bsModal = $("#basicModal");
        $(".btnMemberApproveStatment").off('click').click(function () {
            var mangers = $(this).attr("data-Managers");
            var statment = $(this).attr("data-Statment");
            bsModal.html('');
            var html = '<div class="modal-dialog">' +
                            '<div class="modal-content">' +
                                '<div class="modal-header">' +
                                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>' +
                                    '<h4 class="modal-title"> ' + Messages.ApproveStatment + '  </h4>' +
                                '</div>' +
                                '<div class="modal-body">' +
                                    '<div class="form-horizontal ">' +
                                        '<div class="form-group">' +
                                            '<label class="col-md-4 control-label">' + Messages.ApproveCommittee+': </label>' +
                                            '<label class="col-md-8 control-label" style="text-align: right;">' + (mangers !== "null" ? mangers : " ") + '</label>' +
                                        '</div>' +
                                        '<div class="form-group">' +
                                            '<label class="col-md-4 control-label">' + Messages.Statment +': </label>' +
                                            '<label class="col-md-8 control-label" style="text-align: right;">' + (statment !== "null" ? statment : " ") + '</label>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="modal-footer">' +
                                        '<button type="button" class="btn dark btn-outline" data-dismiss="modal">' + Messages.Close +'</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
            setTimeout(function () {

                bsModal.html(html);
                    bsModal.modal('show');
                    
                },
                300);
        });
    };

    var managersDataTable = function () {
        $('#tblMembers').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetMembersDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[7, 'desc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "MemberId", "value": $("#tbMemberName").attr("data-Id") },
                    { "name": "ConMemberType", "value": 58 });
            },

            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '10%', "mDataProp": "Avatar", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '10%', "mDataProp": lang === "ar" ? "FullNameAr" : "FullNameEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '10%', "mDataProp": lang === "ar" ? "ConMemberPositionAr" : "ConMemberPositionEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "ClubNameAr" : "ClubNameEn", "bSortable": false },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "DestinationAr" : "DestinationEn", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "Mobile", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "InsertedDate", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "UserId", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(7)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveMembers" data-id="' + aData.UserId + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteMembers" data-id ="' + aData.UserId + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnMemberSummary" data-id ="' + aData.UserId + '"><i class="fa fa-eye fa-fw"></i> ' + Messages.Summary + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnMemberApproveStatment" data-id ="' + aData.UserId + '" data-Managers ="' + (lang === "ar" ? aData.ManagersAr : aData.ManagersEn) + '" data-Statment ="' + aData.Notes + '"><i class="fa fa-check fa-fw"></i> ' + Messages.ApproveStatment + '</a>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                $('td:eq(0)', nRow).html('<img  style="width: 100px;" alt="" src="/Content/UploadedFile/Account/Avatar/Thumbnail/' + aData.Avatar + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Account/Avatar/NoImage.png\';"/>');
                $(nRow).dblclick(function () {
                    saveMembersModal($(this).find(".btnSaveMembers").attr("data-id"), $("#SaveModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveMemberModal();
                getMemberSummaryModal();
                getMemberApproveStatmentModal();
                //deleteMembers();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var managersDataTableUpdate = function () {
        var oTable = $('#tblMembers').dataTable();
        oTable.fnDraw(false);
    };

    var unApprovedMembersDataTable = function () {
        $('#tblMembers').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetUnApprovedMembersDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[0, 'desc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "MemberId", "value": $("#tbMemberName").attr("data-Id") },
                    { "name": "ConMemberType", "value": $("#ddlType").val() });
            },

            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '10%', "mDataProp": "UserId", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '10%', "mDataProp": lang === "ar" ? "FullNameAr" : "FullNameEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '10%', "mDataProp": lang === "ar" ? "ConMemberTypeAr" : "ConMemberTypeEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "ClubNameAr" : "ClubNameEn", "bSortable": false },
                { "sType": "html", "sWidth": '10%', "mDataProp": lang === "ar" ? "DestinationAr" : "DestinationEn", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "Mobile", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "InsertedDate", "bSortable": false },
                { "sType": "html", "sWidth": '10%', "mDataProp": lang === "ar" ? "StatusAr" : "StatusEn", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Avatar", "sClass": "tdCenter", "bSortable": false }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(8)', nRow).html('<label class="mt-checkbox" style="margin-left:0 !important;margin-right:0 !important;"> <input  data-id="' + aData.UserId + '" type="checkbox" class="cbSelect"  value="0"/> <span></span></label>');
                $('td:eq(0)', nRow).html('<img  style="width: 100px;" alt="" src="/Content/UploadedFile/Account/Avatar/Thumbnail/' + aData.Avatar + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Account/Avatar/NoImage.png\';"/>');
                
            },
            "fnDrawCallback": function (oSettings) {
                //deleteMembers();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var unApprovedMembersDataTableUpdate = function () {
        var oTable = $('#tblMembers').dataTable();
        oTable.fnDraw(false);
    };
    var getMembersChangeStatusModal = function () {
        var bsModal = $("#basicModal");
        $("#btnApprove, #btnReject").off('click').click(function () {
            var statusId = $(this).attr("data-id");
            var members = "";
            
            $.each($("input[class='cbSelect']:checked"), function (index, item) {
                    if (parseInt($(item).attr("data-id")) > 0)
                        members += $(item).attr("data-id") + ",";
            });
            members = members.substring(0, members.length - 1);
            if (members.length > 0) {
                bsModal.html('');
                setTimeout(function() {
                    bsModal.load("/" + lang + '/ControlPanel/MembersChangeStatusModel?ids=' + members + "&statusId=" + statusId,
                            '',
                            function() {
                                bsModal.modal('show');
                                if (status === "error") {
                                    var msg = "Sorry but there was an error : ";
                                    bsModal.html(msg + xhr.status + " " + xhr.statusText);
                                }
                                resetbooststrapSelect();
                                handleBootstrapSelect();
                                membersChangeStatus();
                            });
                    },
                    300);
            }
        });
    };
    var membersChangeStatus = function () {
        $('#SaveMembersStatus').off("click").click(function () {
            var statusId = $("#ConStatusId").val();
            var membersIds = $("#MembersIds").val();
            var managersIds = $("#ddlManagers").val().join(',');
            var notes = $("#Notes").val();
            if (managersIds.length > 0) {
                gsConfirm('هل انت متاكد من العملية  !!',
                    function(result) {
                        if (result) {
                            $.ajax({
                                type: "POST",
                                cache: false,
                                url: '/ControlPanel/MembersChangeStatus',
                                data: {
                                    "ids": membersIds,
                                    "statusId": statusId,
                                    "managersIds": managersIds,
                                    "notes": notes
                                },
                                dataType: "json",
                                success: function(data) {
                                    if (data.cStatus === "success") {
                                        completedSuccessfuly(data.cMsg);
                                        unApprovedMembersDataTableUpdate();
                                    } else if (data.cStatus === "notValid") {
                                        notValidOperations(data.cMsg);
                                    } else {
                                        notValidOperations(data.cMsg);
                                    }
                                },
                                error: function(xhr, ajaxOptions, thrownError) {
                                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                                }
                            });
                        }
                    });
            }
        });
    };

    var getSaveMemberModal = function () {
        var bsModal = $("#SaveModal");
        $(".btnSaveMember").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            $(".page-content").LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveMemberModal?id=' + id, '', function () {
                    $(".contentDiv").show();
                    $(".tableDiv").hide();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    closeModal();
                    getExperienceModal();
                    getQualificationModal();
                    getMemberFilesModal();
                    getMemberImagesModal();
                    getMemberClubHistoryModal();
                    getMemberBasicInformationModal();
                    getMemberDisciplinesModal();
                    getMemberCoursesModal();
                    getMemberPenaltiesModal();
                    getMemberLoginInfoModal();
                    getMemberAchievementsModal();
                    uploadAvatar();
                    getMedicalExaminationModal();
                    $("#tabMemberBasicInformation").click();
                    $(".page-content").LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var saveMembersModal = function (id, bsModal) {
        bsModal.html('');
        $(".page-content").LoadingOverlay("show");
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveMemberModal?id=' + id, '', function () {
                $(".contentDiv").show();
                $(".tableDiv").hide();
                resetbooststrapSelect();
                handleBootstrapSelect();
                closeModal();
                getExperienceModal();
                getQualificationModal();
                getMemberFilesModal();
                getMemberImagesModal();
                getMemberClubHistoryModal();
                getMemberBasicInformationModal();
                getMemberDisciplinesModal();
                getMemberCoursesModal();
                getMemberPenaltiesModal();
                getMemberLoginInfoModal();
                getMemberAchievementsModal();
                getMedicalExaminationModal();
                uploadAvatar();
                $(".menu-toggler").click();
                $("#tabMemberBasicInformation").click();
                $(".page-content").LoadingOverlay("hide", true);
            });
        }, 300);
    }
    var saveMemberBasicInformation = function () {
        $('#SaveMember').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "UserId", value: $("#tbMemberId").attr("data-accountid") });
            postData.push({ name: "Disciplines", value: $("#LstDiscipline").val() });

            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        scrollToTop();
                        membersDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                        scrollToTop();
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var getMemberBasicInformationModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabMemberBasicInformation").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbMemberId").val();
            bsModal.html('');
            $(".tab-content").parent('div').LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/MemberBasicInformation/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    saveMemberBasicInformation();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    closeModal();
                    expDate();
                    initColorBox();
                    handleDatePickers();
                    $(".tab-content").parent('div').LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var deleteMembers = function () {
        $(".btnDeleteMembers").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/Management/DeleteUserAccount',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                membersDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var getMemberSummaryModal = function () {
        var bsModal = $("#basicModal");
        $(".btnMemberSummary").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            $(".page-content").LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/MemberSummary/' + id, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    //closeModal();
                    printMemberSummary();
                    $(".page-content").LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var printMemberSummary = function () {
        $("#btnPrint").off('click').click(function () {
            var id = $(this).attr("data-id");
            var url = "/ControlPanel/PrintMemberSummary?id=" + id;
            
            var printWindow = window.open(url, 'Print', 'left=200, top=100, width=950, height=500, toolbar=0, resizable=0');
            printWindow.addEventListener('load', function () {
                printWindow.print();
                printWindow.close();
            }, true);
        });
    };

    var getMemberLoginInfoModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabMemberLoginInfo").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbMemberId").val();
            bsModal.html('');
            $(".tab-content").LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/MemberLoginInfo/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveClubLoginInfo();
                    closeModal();
                    $(".tab-content").LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };


    var getMemberImagesModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabImages").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbMemberId").val();
            bsModal.html('');
            $(".tab-content").parent('div').LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/MemberImages/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    getSaveMemberClubImageModal(1);
                    closeModal();
                    initColorBox();
                    $(".tab-content").parent('div').LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var getSaveMemberClubImageModal = function (category) {
        var bsModal = $("#basicModal");
        $(".btnSaveImage").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveMemberClubImagesModal/' + id, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    saveMemberClubFile(category, 1);
                    uploadMemberClubImg();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    intiDropZone();
                });
            }, 300);
        });
    };
    var saveMemberClubFile = function (category, fileType) {
        $('#SaveMemberClubFile').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "RecId", value: $("#tbMemberId").attr("data-accountid") });
            postData.push({ name: "FileType", value: fileType });
            postData.push({ name: "Category", value: category });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        memberClubFilesDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };

    var getMedicalExaminationModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabMedicalExamination").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbMemberId").attr("data-accountid");
            bsModal.html('');
            $(".tab-content").parent('div').LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/MedicalExaminations/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    closeModal();
                    medicalExaminationsDataTable();
                    $(".tab-content").parent('div').LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var medicalExaminationsDataTable = function () {
        $('#tblMedicalExaminations').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetMedicalExaminationsDataTable",
            "bPaginate": false,
            "dom": 'lfrti',
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "MemberId", "value": $("#tbMemberId").attr("data-accountId") });
            },
            "info": false,
            "aaSorting": [[4, 'asc']],
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '25%', "mDataProp": "ExaminationDate", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "NameAr" : "NameEn" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "DoctorName" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "Signed" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(4)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveMedicalExaminations" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteMedicalExaminations" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                //$('td:eq(1)', nRow).html(joinString(aData.NameAr, aData.NameEn));
                if (aData.Signed) {
                    $('td:eq(3)', nRow).html('<span class="font-green-meadow fa fa-fw fa-check-circle-o fa-lg"></span>');
                } else {
                    $('td:eq(3)', nRow).html('<span class="font-red-thunderbird fa fa-fw fa-times-circle-o fa-lg"></span>');
                }

                $(nRow).dblclick(function () {
                    SaveMedicalExaminationsModel($(this).find(".btnSaveMedicalExaminations").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveMedicalExaminationsModal();
                deleteMedicalExamination();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var medicalExaminationsDataTableUpdate = function () {
        var oTable = $('#tblMedicalExaminations').dataTable();
        oTable.fnDraw(false);
    };
    var getSaveMedicalExaminationsModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveMedicalExaminations").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveMedicalExaminationModal/' + id, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    handleDatePickers();
                    saveMedicalExamination();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var SaveMedicalExaminationsModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveMedicalExaminationModal/' + id, '', function () {
                bsModal.modal('show');
                if (status === "error") {
                    var msg = "Sorry but there was an error : ";
                    bsModal.html(msg + xhr.status + " " + xhr.statusText);
                }
                handleDatePickers();
                saveMedicalExamination();
                resetbooststrapSelect();
                handleBootstrapSelect();
            });
        }, 300);
    }
    var saveMedicalExamination = function () {
        $('#SaveMedicalExamination').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "MemberId", value: $("#tbMemberId").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        medicalExaminationsDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var deleteMedicalExamination = function () {
        $(".btnDeleteMedicalExaminations").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteMedicalExamination',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                medicalExaminationsDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };


    var getExperienceModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabExperiences").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbMemberId").attr("data-accountid");
            bsModal.html('');
            $(".tab-content").parent('div').LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/Experiences/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    closeModal();
                    experiencesDataTable();
                    $(".tab-content").parent('div').LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var experiencesDataTable = function () {
        $('#tblExperiences').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetExperiencesDataTable",
            "bPaginate": false,
            "dom": 'lfrti',
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "MemberId", "value": $("#tbMemberId").attr("data-accountId") });
            },
            "info": false,
            "aaSorting": [[4, 'asc']],
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "Name" : "NameEn", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "PlaceAr" : "PlaceEn" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "FromDate" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "ExpDuration" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(4)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveExperiences" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteExperiences" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                //$('td:eq(0)', nRow).html(joinString(aData.ExperienceAr, aData.ExperienceEn));
                //$('td:eq(1)', nRow).html(joinString(aData.PlaceAr, aData.PlaceEn));
                $('td:eq(2)', nRow).html(joinString(aData.FromDate, aData.ToDate));

                $(nRow).dblclick(function () {
                    SaveExperiencesModel($(this).find(".btnSaveExperiences").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveExperiencesModal();
                deleteExperience();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var experiencesDataTableUpdate = function () {
        var oTable = $('#tblExperiences').dataTable();
        oTable.fnDraw(false);
    };
    var getSaveExperiencesModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveExperiences").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveExperienceModal/' + id, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    handleDatePickers();
                    saveExperience();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var SaveExperiencesModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveExperienceModal/' + id, '', function () {
                bsModal.modal('show');
                if (status === "error") {
                    var msg = "Sorry but there was an error : ";
                    bsModal.html(msg + xhr.status + " " + xhr.statusText);
                }
                handleDatePickers();
                saveExperience();
                resetbooststrapSelect();
                handleBootstrapSelect();
            });
        }, 300);
    }
    var saveExperience = function () {
        $('#SaveExperience').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "UserID", value: $("#tbMemberId").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        experiencesDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var deleteExperience = function () {
        $(".btnDeleteExperiences").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteExperience',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                experiencesDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };

    var getQualificationModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabQualification").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbMemberId").attr("data-accountid");
            bsModal.html('');
            $(".tab-content").parent('div').LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/Qualification/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    closeModal();
                    QualificationDataTable();
                    $(".tab-content").parent('div').LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var QualificationDataTable = function () {
        $('#tblQualification').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetQualificationDataTable",
            "bPaginate": false,
            "dom": 'lfrti',
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "MemberId", "value": $("#tbMemberId").attr("data-accountId") });
            },
            "info": false,
            "aaSorting": [[5, 'asc']],
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '15%', "mDataProp": lang === "ar" ? "DegreeAr" : "DegreeEn", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "Name" },
                { "sType": "html", "sWidth": '15%', "mDataProp": "GraduateDate" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Duration" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "Place" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(5)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveQualification" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteQualification" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                //$('td:eq(0)', nRow).html(joinString(aData.QualificationAr, aData.QualificationEn));
                //$('td:eq(1)', nRow).html(joinString(aData.PlaceAr, aData.PlaceEn));
                //$('td:eq(2)', nRow).html(joinString(aData.FromDate, aData.ToDate));

                $(nRow).dblclick(function () {
                    SaveQualificationModel($(this).find(".btnSaveQualification").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveQualificationModal();
                deleteQualification();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var QualificationDataTableUpdate = function () {
        var oTable = $('#tblQualification').dataTable();
        oTable.fnDraw(false);
    };
    var getSaveQualificationModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveQualification").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveQualificationModal/' + id, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    handleDatePickers();
                    saveQualification();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var SaveQualificationModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveQualificationModal/' + id, '', function () {
                bsModal.modal('show');
                if (status === "error") {
                    var msg = "Sorry but there was an error : ";
                    bsModal.html(msg + xhr.status + " " + xhr.statusText);
                }
                handleDatePickers();
                saveQualification();
                resetbooststrapSelect();
                handleBootstrapSelect();
            });
        }, 300);
    }
    var saveQualification = function () {
        $('#SaveQualification').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "UserID", value: $("#tbMemberId").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        QualificationDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var deleteQualification = function () {
        $(".btnDeleteQualification").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteQualification',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                QualificationDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };

    var getMemberFilesModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabFiles").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbMemberId").val();
            bsModal.html('');
            $(".tab-content").parent('div').LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang +'/ControlPanel/MemberFiles/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    getSaveMemberClubFileModal(1);
                    memberClubFilesDataTable(1);
                    closeModal();
                    $(".tab-content").parent('div').LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var memberClubFilesDataTable = function (category) {
        $('#tblMemberClubFiles').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/ControlPanel/GetMemberClubFilesDataTable",
            "bProcessing": true,
            "bPaginate": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[2, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "RecId", "value": $("#tbMemberId").attr("data-accountId") },
                    { "name": "Category", "value": category });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '45%', "mDataProp": "Note", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '45%', "mDataProp": "NoteEn", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '10%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(2)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveFiles" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteFiles" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a  class="lnk" download ="' + aData.FilePath + '" href="/Content/UploadedFile/MemberClubFiles/Files/' + aData.FilePath + '"><i class="fa fa-trash fa-fw"></i> تحميل </a>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');

                $(nRow).dblclick(function () {
                    saveMemberClubFileModal($(this).find(".btnSaveFiles").attr("data-id"), $("#basicModal"), category);
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveMemberClubFileModal(category);
                //deleteMemberClubHistory();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var memberClubFilesDataTableUpdate = function () {
        var oTable = $('#tblMemberClubFiles').dataTable();
        oTable.fnDraw(false);
    };

    var getSaveMemberClubFileModal = function (category) {
        var bsModal = $("#basicModal");
        $(".btnSaveFiles").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang +'/ControlPanel/SaveMemberClubFileModal/' + id, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    upLoadMemberClubFile();

                    saveMemberClubFile(category, 2);
                    uploadMemberClubImg();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var saveMemberClubFileModal = function (id, bsModal, category) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load('/ControlPanel/SaveMemberClubFileModal/' + id, '', function () {
                bsModal.modal('show');
                if (status === "error") {
                    var msg = "Sorry but there was an error : ";
                    bsModal.html(msg + xhr.status + " " + xhr.statusText);
                }
                upLoadMemberClubFile();
                saveMemberClubFile(category, 2);
                uploadMemberClubImg();
                resetbooststrapSelect();
                handleBootstrapSelect();
            });
        }, 300);
    }


    var hideDate = function () {
        $('#cbToPresent').change(function () {
            if (this.checked) {
                $('#tbToDate').closest(".col-md-6").hide();
                $('#tbToDate').hide();
                $('#tbToDate').val("");
            }
            else {
                $('#tbToDate').closest(".col-md-6").show();
                $('#tbToDate').show();
            }
        });
    }
    var getMemberClubHistoryModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabMemberClubHistory").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbMemberId").val();
            bsModal.html('');
            $(".tab-content").parent('div').LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/MemberClubHistory/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    closeModal();
                    membersClubHistoryDataTable();
                    initColorBox();
                    $(".tab-content").parent('div').LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var membersClubHistoryDataTable = function () {
        $('#tblMemberClubHistory').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetMemberClubsHistoryDataTable",
            "bProcessing": true,

            "bPaginate": false,
            "dom": 'lfrti',
            "info": false,
            "aaSorting": [[5, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "MemberId", "value": $("#tbMemberId").attr("data-accountId") });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "ClubNameAr" : "ClubNameEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '15%', "mDataProp": lang === "ar" ? "ConMemberTypeNameAr" : "ConMemberTypeNameEn" , "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "FromDate", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "Years", "bSortable": false },
                { "sType": "html", "sWidth": '10%', "mDataProp": "ToPresent", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                //$('td:eq(1)', nRow).html(joinString(aData.NameAr, aData.NameEn));

                //$('td:eq(0)', nRow).html(joinString(aData.ClubNameAr, aData.ClubNameEn));
                //$('td:eq(1)', nRow).html(joinString(aData.ConMemberTypeNameAr, aData.ConMemberTypeNameEn));
                $('td:eq(2)', nRow).html(joinString(aData.FromDate, aData.ToDate));
                if (aData.ToPresent) {
                    $('td:eq(4)', nRow).html('<span class="font-green-meadow fa fa-fw fa-check-circle-o fa-lg"></span>');
                } else {
                    $('td:eq(4)', nRow).html('<span class="font-red-thunderbird fa fa-fw fa-times-circle-o fa-lg"></span>');
                }
                $('td:eq(5)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveMemberClubHistory" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteMemberClub" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');

                $(nRow).dblclick(function () {
                    saveMemberClubHistoryModal($(this).find(".btnSaveMemberClubHistory").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveMemberClubHistoryModal();
                deleteMemberClubHistory();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var membersClubHistoryDataTableUpdate = function () {
        var oTable = $('#tblMemberClubHistory').dataTable();
        oTable.fnDraw(false);
    };

    var getSaveMemberClubHistoryModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveMemberClubHistory").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveMemberClubHistoryModal/' + id, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    hideDate();
                    handleDatePickers();
                    saveMemberClubHistory();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var saveMemberClubHistoryModal = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveMemberClubHistoryModal/' + id, '', function () {
                bsModal.modal('show');
                if (status === "error") {
                    var msg = "Sorry but there was an error : ";
                    bsModal.html(msg + xhr.status + " " + xhr.statusText);
                }
                hideDate();
                handleDatePickers();
                saveMemberClubHistory();
                resetbooststrapSelect();
                handleBootstrapSelect();
            });
        }, 300);
    }
    var saveMemberClubHistory = function () {
        $('#SaveMemberClubHistory').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "MemberId", value: $("#tbMemberId").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        membersClubHistoryDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var deleteMemberClubHistory = function () {
        $(".btnDeleteMemberClub").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteMemberClubHistory',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                playerDisciplinesDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };

    function fnHideCol(iCol, tblname) {
        /* Get the DataTables object again - this is not a recreation, just a get of the object */
        var oTable = $("#" + tblname).dataTable();

        var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
        oTable.fnSetColumnVis(iCol, false);
    }
    function fnShowCol(iCol, tblname) {
        /* Get the DataTables object again - this is not a recreation, just a get of the object */
        var oTable = $("#" + tblname).dataTable();

        var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
        oTable.fnSetColumnVis(iCol, true);
    }
    var getMemberDisciplinesModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabMemberDiscipline").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbMemberId").attr("data-accountid");
            bsModal.html('');
            $(".tab-content").parent('div').LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/MemberDisciplines/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    closeModal();
                    playerDisciplinesDataTable();
                    $(".tab-content").parent('div').LoadingOverlay("hide", true);
                    var playerType = parseInt($("#tblMembers").attr("data-memberType"));
                    if (playerType !== 54) {
                        fnHideCol(1, "tblPlayerDisciplines");
                    } else {
                        fnShowCol(1, "tblPlayerDisciplines");
                    }
                });
            }, 300);
        });
    };
    var playerDisciplinesDataTable = function () {
        $('#tblPlayerDisciplines').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetPlayerDisciplinesDataTable",
            "bPaginate": false,
            "dom": 'lfrti',
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "MemberId", "value": $("#tbMemberId").attr("data-accountId") });
            },
            "info": false,
            "aaSorting": [[2, 'asc']],
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '45%', "mDataProp": lang === "ar" ? "DNameAr" : "DNameEn", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '50%', "mDataProp": "PersonalRecord" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                
                //$('td:eq(0)', nRow).html(joinString(aData.NameAr, aData.NameEn));
                var playerType = parseInt($("#tblMembers").attr("data-memberType"));
                if (playerType === 54) {
                    if (lang === "ar")
                        $('td:eq(1)', nRow).html(aData.PersonalRecord + " " + aData.NameAr);
                    else {
                        if (aData.NameEn !== null)
                            $('td:eq(1)', nRow).html(aData.PersonalRecord + " " + aData.NameEn);
                    }
                    $('td:eq(2)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSavePlayerDisciplines" data-id="' +
                        aData.Id +
                        '"><i class="fa fa-edit fa-fw"></i> ' +
                        Messages.edit +
                        '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeletePlayerDisciplines" data-id ="' +
                        aData.Id +
                        '"><i class="fa fa-trash fa-fw"></i> ' +
                        Messages.delete +
                        '</a>' +
                        ' </li>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                } else {
                    $('td:eq(1)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSavePlayerDisciplines" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeletePlayerDisciplines" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                }

                $(nRow).dblclick(function () {
                    SavePlayerDisciplinesModel($(this).find(".btnSavePlayerDisciplines").attr("data-id"), $("#tbMemberId").val(), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSavePlayerDisciplinesModal();
                deletePlayerDiscipline();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var playerDisciplinesDataTableUpdate = function () {
        var oTable = $('#tblPlayerDisciplines').dataTable();
        oTable.fnDraw(false);
    };
    var getSavePlayerDisciplinesModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSavePlayerDisciplines").off('click').click(function () {
            var id = $(this).attr("data-id");
            var uId = $("#tbMemberId").val();
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveMemberDisciplineModal?id=' + id + '&uId=' + uId, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    savePlayerDiscipline();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var SavePlayerDisciplinesModel = function (id, uId, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveMemberDisciplineModal?id=' + id + "&uId=" + uId, '', function () {
                bsModal.modal('show');
                if (status === "error") {
                    var msg = "Sorry but there was an error : ";
                    bsModal.html(msg + xhr.status + " " + xhr.statusText);
                }
                savePlayerDiscipline();
                resetbooststrapSelect();
                handleBootstrapSelect();
            });
        }, 300);
    }
    var savePlayerDiscipline = function () {
        $('#SavePlayerDiscipline').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "MemberId", value: $("#tbMemberId").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        playerDisciplinesDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var deletePlayerDiscipline = function () {
        $(".btnDeletePlayerDisciplines").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeletePlaterDiscipline',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                playerDisciplinesDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };

    var getMemberCoursesModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabMemberCourse").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbMemberId").val();
            bsModal.html('');
            $(".tab-content").parent('div').LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/MemberCourses/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    closeModal();
                    memberCourseDataTable();
                    $(".tab-content").parent('div').LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var memberCourseDataTable = function () {
        $('#tblMemberCourse').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetMemberCoursesDataTable",
            "bProcessing": true,
            "bPaginate": false,
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "MemberId", "value": $("#tbMemberId").attr("data-accountId") });
            },
            "dom": 'lfrti',
            "info": false,
            "aaSorting": [[5, 'asc']],

            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "Name" : "NameEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '15%', "mDataProp": lang === "ar" ? "LevelNameAr" : "LevelNameEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '30%', "mDataProp": lang === "ar" ? "Place" : "PlaceEn", "bSortable": false },
                { "sType": "html", "sWidth": '25%', "mDataProp": "StartDate", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "CType", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                //$('td:eq(0)', nRow).html(joinString(aData.CourseName, aData.CourseNameEn));
                //$('td:eq(1)', nRow).html(joinString(aData.LevelNameAr, aData.LevelNameEn));
                //$('td:eq(2)', nRow).html(joinString(aData.Place, aData.PlaceEn));
                $('td:eq(3)', nRow).html(joinString(aData.StartDate, aData.EndDate));

                if (aData.CType === 1) {
                    $('td:eq(5)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnsv btnSaveMemberCourse" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteMeberCourse" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(4)', nRow).html('<span>' + Messages.InternalCourses +'</span>');
                }
                if (aData.CType === 2) {
                    $('td:eq(5)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnsv btnSaveMemberOldCourse" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteMEmberOldCourse" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(4)', nRow).html('<span>' + Messages.ExternalCourses +'</span>');

                }
                $(nRow).dblclick(function () {
                    if ($(this).find(".btnsv").hasClass("btnSaveMemberOldCourse")) {
                        saveMemberOldCourseModal($(this).find(".btnSaveMemberOldCourse").attr("data-id"), $("#basicModal"));
                    } else {
                        saveMemberCourseModal($(this).find(".btnSaveMemberCourse").attr("data-id"), $("#basicModal"));
                    }
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveMemberCourseModal();
                getSaveMemberOldCourseModal();
                deleteMemberCourse();
                deleteMemberOldCourse();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var memberCourseDataTableUpdate = function () {
        var oTable = $('#tblMemberCourse').dataTable();
        oTable.fnDraw(false);
    };
    var getSaveMemberCourseModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveMemberCourse").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveMemberCourseModal/' + id, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    courseSearchAutoComplete();
                    handleDatePickers();
                    saveMemberCourse();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var saveMemberCourseModal = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveMemberCourseModal/' + id, '', function () {
                bsModal.modal('show');
                if (status === "error") {
                    var msg = "Sorry but there was an error : ";
                    bsModal.html(msg + xhr.status + " " + xhr.statusText);
                }
                courseSearchAutoComplete();
                handleDatePickers();
                saveMemberCourse();
                resetbooststrapSelect();
                handleBootstrapSelect();
            });
        }, 300);
    }
    var saveMemberCourse = function () {
        $('#SaveMemberCourse').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "MemberId", value: $("#tbMemberId").val() });
            postData.push({ name: "CourseId", value: $("#tbCourseId").attr("data-id") });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        memberCourseDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var getSaveMemberOldCourseModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveMemberOldCourse").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveMemberOldCourseModal/' + id, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    handleDatePickers();
                    saveMemberOldCourse();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var saveMemberOldCourseModal = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveMemberOldCourseModal/' + id, '', function () {
                bsModal.modal('show');
                if (status === "error") {
                    var msg = "Sorry but there was an error : ";
                    bsModal.html(msg + xhr.status + " " + xhr.statusText);
                }
                handleDatePickers();
                saveMemberOldCourse();
                resetbooststrapSelect();
                handleBootstrapSelect();
            });
        }, 300);
    }
    var saveMemberOldCourse = function () {
        $('#SaveMemberOldCourse').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "MemberId", value: $("#tbMemberId").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        memberCourseDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var courseSearchAutoComplete = function () {
        if (!$('#tbCourse').hasClass('tt-input')) {
            var course = new Bloodhound({
                datumTokenizer: function (d) { return d.tokens; },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/ControlPanel/SearchAutoCompleteCourse/%QUERY',
                    wildcard: '%QUERY'
                }
            });
            course.initialize();
            $('#tbCourse').typeahead({
                hint: true,
                highlight: true,
                minLength: 1,
                dir: true
            }, {
                    name: 'search-course',
                    displayKey: 'Name',
                    source: course.ttAdapter(),
                    limit: 20,
                    dir: true,
                    templates: {
                        empty: [
                            '<div class="empty-message">',
                            '' + Messages.noResultFound + '',
                            '</div>'
                        ].join('\n'),
                        suggestion: Handlebars.compile([
                            '<div class="media">',
                            '<div class="pull-left">',
                            '<div class="media-object">',
                            '</div>',
                            '</div>',
                            '<div class="media-body">',
                            ' ',
                            ' <h5 class="media-heading">{{Name}} </h5>',
                            '</div>',
                            '</div>'
                        ].join(''))
                    }
                }).on('typeahead:selected', function ($e, datum) {
                    $("#tbCourse").attr('data-id', datum.Id);
                });
        }
    };
    var deleteMemberCourse = function () {
        $(".btnDeleteMeberCourse").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteMemberCourse',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                memberCourseDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var deleteMemberOldCourse = function () {
        $(".btnDeleteMEmberOldCourse").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteMemberOldCourse',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                memberCourseDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };


    var getMemberPenaltiesModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabMemberPenalties").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbMemberId").attr("data-accountid");
            bsModal.html('');
            $(".tab-content").parent('div').LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang +'/ControlPanel/MemberPenalties/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    closeModal();
                    memberPenaltiesDataTable();
                    $(".tab-content").parent('div').LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var memberPenaltiesDataTable = function () {
        $('#tblMemberPenaltiesHistory').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang +"/ControlPanel/GetMemberPenaltiesDataTable",
            "bProcessing": true,
            "bPaginate": false,
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "MemberId", "value": $("#tbMemberId").attr("data-accountId") });
            },
            "dom": 'lfrti',
            "info": false,
            "aaSorting": [[4, 'asc']],
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '30%', "mDataProp": lang === "ar" ? "ConTypeAr" : "ConTypeEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "ConDecisionMakerAr" : "ConDecisionMakerEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '30%', "mDataProp": "FromDate", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "DecisionTakenIn", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                //$('td:eq(0)', nRow).html(joinString(aData.ConTypeAr, aData.ConTypeEn));
                //$('td:eq(1)', nRow).html(joinString(aData.ConDecisionMakerAr, aData.ConDecisionMakerEn));
                $('td:eq(2)', nRow).html(joinString(aData.FromDate, aData.ToDate));

                $('td:eq(4)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveMemberPenaltie" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteMemberPenaltie" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');

                $(nRow).dblclick(function () {
                    saveMemberPenaltieModal($(this).find(".btnSaveMemberPenaltie").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveMemberPenaltieModal();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var memberPenaltiesDataTableUpdate = function () {
        var oTable = $('#tblMemberPenaltiesHistory').dataTable();
        oTable.fnDraw(false);
    };

    var handelPenaltieTypeChange = function () {
        $("#ddlConType").off("change").change(function () {
            var v = $(this).val();
            if (v === '1030' || v === '1031') {
                $(".pDates").show();
            } else {
                $(".pDates").hide();
                $(".pDates").find('input').val("");

            }
        });
    }
    var getSaveMemberPenaltieModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveMemberPenaltie").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang +'/ControlPanel/SavePenaltiesModal/' + id, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    handleDatePickers();
                    handelPenaltieTypeChange();
                    saveMemberPenaltie();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var saveMemberPenaltieModal = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang +'/ControlPanel/SavePenaltiesModal/' + id, '', function () {
                bsModal.modal('show');
                if (status === "error") {
                    var msg = "Sorry but there was an error : ";
                    bsModal.html(msg + xhr.status + " " + xhr.statusText);
                }
                handleDatePickers();
                handelPenaltieTypeChange();
                saveMemberPenaltie();
                resetbooststrapSelect();
                handleBootstrapSelect();
            });
        }, 300);
    }
    var saveMemberPenaltie = function () {
        $('#SaveMemberPenalties').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "MemberId", value: $("#tbMemberId").attr("data-accountid") });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        memberPenaltiesDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };

    var getMemberAchievementsModal = function () {
        var bsModal = $("#ContentTab");
        $("#tabAchievement").off('click').click(function () {
            $(".profile ul.profile-nav li a").css({ "color": "", "background-color": "", "text-decoration": "", "border-left": "" });
            $(this).css({ "color": "#169ef4", "background-color": "#ecf5fb", "text-decoration": "none", "border-left": "solid 2px #169ef4" });
            var id = $("#tbMemberId").val();
            bsModal.html('');
            $(".tab-content").parent('div').LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/MemberAchievements/' + id, '', function () {
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    closeModal();
                    memberAchievementsDataTable();
                    $(".tab-content").parent('div').LoadingOverlay("hide", true);
                });
            }, 300);
        });
    };
    var memberAchievementsDataTable = function () {
        $('#tblAchievement').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetMemberAchievementsDataTable",
            "bProcessing": true,
            "bPaginate": false,
            "dom": 'lfrti',
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "MemberId", "value": $("#tbMemberId").attr("data-accountId") });
            },
            "info": false,
            "aaSorting": [[5, 'asc']],
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "Occasion" : "OccasionEn", "bSortable": false, "sClass": "tdCenter" },
                //{ "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "AwardPositionAr" : "AwardPositionEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "TitleAr" : "TitleEn", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '15%', "mDataProp": "Date", "bSortable": false },
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "Place" : "PlaceEn", "bSortable": false },
                { "sType": "html", "sWidth": '25%', "mDataProp": "AchType", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                //$('td:eq(1)', nRow).html(joinString(aData.Achievement, aData.AchievementEn));
                //$('td:eq(2)', nRow).html(joinString(aData.TitleAr, aData.TitleEn));
                //$('td:eq(0)', nRow).html(joinString(aData.Occasion, aData.OccasionEn));
                //$('td:eq(4)', nRow).html(joinString(aData.Place, aData.PlaceEn));
                if (aData.AchType === 1) {
                    $('td:eq(5)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnsv btnSaveMemberOldAchievement" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeletebtnMemberOldAchievement" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(4)', nRow).html('<span>' + Messages.ExternalTournament +'</span>');

                }
                if (aData.AchType === 2) {
                    $('td:eq(5)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnsv btnSaveAchievement" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteAchievement" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(4)', nRow).html('<span>' + Messages.InternalTournament +'</span>');
                }
                $(nRow).dblclick(function () {
                    if ($(this).find(".btnsv").hasClass("btnSaveMemberOldAchievement")) {
                        saveMemberOldAchievementModal($(this).find(".btnSaveMemberOldAchievement").attr("data-id"), $("#basicModal"));
                    } else {
                        saveMemberAchievementModal($(this).find(".btnSaveAchievement").attr("data-id"), $("#basicModal"));
                    }
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveMemberAchievementModal();
                getSaveMemberOldAchievementModal();
                deleteMemberOldAchievement();
                deleteMemberAchievement();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var memberAchievementsDataTableUpdate = function () {
        var oTable = $('#tblAchievement').dataTable();
        oTable.fnDraw(false);
    };

    var getSaveMemberOldAchievementModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveMemberOldAchievement").off('click').click(function () {
            var id = $(this).attr("data-id");
            var mTypeId = $("#tblMembers").attr("data-memberType");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/GetMemberOldAchievementModal?id=' + id + "&mTypeId=" + mTypeId, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    handleDatePickers();
                    saveMemberOldAchievement();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var saveMemberOldAchievementModal = function (id, bsModal) {
        var mTypeId = $("#tblMembers").attr("data-memberType");
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/GetMemberOldAchievementModal?id=' + id + "&mTypeId=" + mTypeId, '', function () {
                bsModal.modal('show');
                if (status === "error") {
                    var msg = "Sorry but there was an error : ";
                    bsModal.html(msg + xhr.status + " " + xhr.statusText);
                }
                handleDatePickers();
                saveMemberOldAchievement();
                resetbooststrapSelect();
                handleBootstrapSelect();
            });
        }, 300);
    }
    var saveMemberOldAchievement = function () {
        $('#SaveMemberOldAchievement').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "MemberId", value: $("#tbMemberId").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        memberAchievementsDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var deleteMemberOldAchievement = function () {
        $(".btnDeletebtnMemberOldAchievement").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteMemberOldAchievement',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                memberAchievementsDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });

    };
    /********************/
    var getSaveMemberAchievementModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveAchievement").off('click').click(function () {
            var id = $(this).attr("data-id");
            var mTypeId = $("#tblMembers").attr("data-memberType");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/GetMemberAchievementModal?id=' + id + "&mTypeId=" + mTypeId, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    tournamentSearchAutoComplete();
                    handleDatePickers();
                    saveMemberAchievement();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var saveMemberAchievementModal = function (id, bsModal) {
        var mTypeId = $("#tblMembers").attr("data-memberType");
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/GetMemberAchievementModal?id=' + id + "&mTypeId=" + mTypeId, '', function () {
                bsModal.modal('show');
                if (status === "error") {
                    var msg = "Sorry but there was an error : ";
                    bsModal.html(msg + xhr.status + " " + xhr.statusText);
                }
                tournamentSearchAutoComplete();
                handleDatePickers();
                saveMemberAchievement();
                resetbooststrapSelect();
                handleBootstrapSelect();
            });
        }, 300);
    }
    var saveMemberAchievement = function () {
        $('#SaveMemberAchievement').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "MemberId", value: $("#tbMemberId").val() });
            postData.push({ name: "TournamentId", value: $("#tbTournament").attr("data-id") });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        memberAchievementsDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var deleteMemberAchievement = function () {
        $(".btnDeleteAchievement").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteMemberAchievement',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                memberAchievementsDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });

    };
    /**********************/

    var AgeCategoryDataTable = function () {
        $('#tblAgeCategories').dataTable({
            "language": {
                "url": "../../Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json"
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetAgeCategoryDataTable",
            "bPaginate": false,
            "dom": 'lfrti',
            //"fnServerParams": function (aoData) {
            //    aoData.push({ "name": "MemberId", "value": $("#tbMemberId").attr("data-accountId") });
            //},
            "info": false,
            "aaSorting": [[4, 'asc']],
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "Name" : "NameEn", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "AgeMin" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "AgeMax" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "Gender" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                if (aData.Gender === "M") {
                    $('td:eq(3)', nRow).html("<span>" + Messages.Ms + "</span>");
                } else if (aData.Gender === "F") {
                    $('td:eq(3)', nRow).html("<span>" + Messages.Fs + "</span>");
                }
                $('td:eq(4)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveAgeCategory" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteAgeCategory" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                $(nRow).dblclick(function () {
                    SaveAgeCategoryModel($(this).find(".btnSaveAgeCategory").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveAgeCategoryModal();
                deleteAgeCategory();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var AgeCategoryDataTableUpdate = function () {
        var oTable = $('#tblAgeCategories').dataTable();
        oTable.fnDraw(false);
    };
    var getSaveAgeCategoryModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveAgeCategory").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang +'/ControlPanel/SaveAgeCategoryModal/' + id, '', function () {
                    bsModal.modal('show');
                    if (status === "error") {
                        var msg = "Sorry but there was an error : ";
                        bsModal.html(msg + xhr.status + " " + xhr.statusText);
                    }
                    handleDatePickers();
                    saveAgeCategory();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                });
            }, 300);
        });
    };
    var SaveAgeCategoryModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang +'/ControlPanel/SaveAgeCategoryModal/' + id, '', function () {
                bsModal.modal('show');
                if (status === "error") {
                    var msg = "Sorry but there was an error : ";
                    bsModal.html(msg + xhr.status + " " + xhr.statusText);
                }
                handleDatePickers();
                saveAgeCategory();
                resetbooststrapSelect();
                handleBootstrapSelect();
            });
        }, 300);
    }
    var saveAgeCategory = function () {
        $('#SaveAgeCategory').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        AgeCategoryDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var deleteAgeCategory = function () {
        $(".btnDeleteAgeCategory").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteAgeCategory',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                AgeCategoryDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };

    /**********************/
    var tournamentDataTable = function () {
        $('#tblTournament').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/GetTournamentsDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[7, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push(
                    { "name": "Id", "value": $("#tbTournament").attr("data-Id") },
                    { "name": "Type", "value": $("#ddlType").val() },
                    { "name": "FromDate", "value": $("#tbFromDate").val() },
                    { "name": "ToDate", "value": $("#tbToDate").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '5%', "mDataProp": "Image", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "Name" : "NameEn", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "Place" : "PlaceEn" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "StartDate", "bSortable": false },
                //{ "sType": "html", "sWidth": '20%', "mDataProp": "RegistrationStartDate", "bSortable": false },
                { "sType": "html", "sWidth": '10%', "mDataProp": "NAgeCategory" },
                { "sType": "html", "sWidth": '10%', "mDataProp": lang === "ar" ? "TypeAr" : "TypeEn" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "Dname", "sClass": "tdCenter", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(7)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveTournament" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteTournament" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                $('td:eq(0)', nRow).html('<img  style="width: 100px;" alt="" src="/Content/UploadedFile/Albums/Thumbnail/' + aData.Image + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Account/Avatar/NoImage.png\';"/>');
                //$('td:eq(1)', nRow).html(joinString(aData.Name, aData.NameEn));
                $('td:eq(3)', nRow).html(joinString(aData.StartDate, aData.EndDate));
                //$('td:eq(2)', nRow).html(joinString(aData.Place, aData.PlaceEn));
                //$('td:eq(4)', nRow).html(joinString(aData.RegistrationStartDate, aData.RegistrationEnDate));
                //$('td:eq(4)', nRow).html(joinString(aData.PCategoryAr, aData.PCategoryEn));
                //$('td:eq(5)', nRow).html(joinString(aData.TypeAr, aData.TypeEn));

                $(nRow).dblclick(function () {
                    SaveTournamentModel($(this).find(".btnSaveTournament").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveTournamentModal();
                deleteTournament();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var tournamentDataTableUpdate = function () {
        var oTable = $('#tblTournament').dataTable();
        oTable.fnDraw(false);
    };
    var searchTournamentsDataTable = function () {
        $("#btnSearch").off("click").click(function () {
            tournamentDataTableUpdate();
        });
    };
    var resetTournamentsDataTable = function () {
        $("#btnClearForm").off("click").click(function () {
            $("#tbTournament").removeAttr("data-id");
            gsResetInsertForm("SearchForm");
            tournamentDataTableUpdate();
        });
    };
    var SaveTournamentModel = function (id, bsModal) {
        window.location.href = "/" + lang + '/ControlPanel/Tournament/' + id;
        //bsModal.html('');
        //setTimeout(function () {
        //    bsModal.load('/ControlPanel/SaveTournamentModal?id=' + id, '', function () {
        //        bsModal.modal('show');
        //        resetbooststrapSelect();
        //        handleBootstrapSelect();
        //        saveTournament();
        //        uploadAlbums();
        //        handleDatePickers();
        //    });
        //}, 100);
    }
    var getSaveTournamentModal = function () {
        //var bsModal = $("#basicModal");
        $(".btnSaveTournament").off('click').click(function () {
            var id = $(this).attr("data-id");
            window.location.href = "/" + lang + '/ControlPanel/Tournament/' + id;

            //bsModal.html('');
            //setTimeout(function () {
            //    bsModal.load('/ControlPanel/SaveTournamentModal?id=' + id, '', function () {
            //        bsModal.modal('show');
            //        uploadAlbums()
            //        resetbooststrapSelect();
            //        handleBootstrapSelect();
            //        saveTournament();
            //        handleDatePickers();
            //    });
            //}, 100);
        });
    };
    var saveTournament = function () {
        $('#SaveTournamentForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "Disciplines", value: $("#ddlDisciplines").val() });
            postData.push({ name: "PlayerCategory", value: $("#ddlPlayerCategory").val() });
            //postData.push({ name: "AgeCategory", value: $("#ddlAgeCategory").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        tournamentDataTableUpdate();

                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteTournament = function () {
        $(".btnDeleteTournament").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteTournament',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                tournamentDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var tournamentSearchAutoComplete = function () {
        if (!$('#tbTournament').hasClass('tt-input')) {
            var tournament = new Bloodhound({
                datumTokenizer: function (d) { return d.tokens; },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/ControlPanel/SearchAutoCompleteTournament/%QUERY',
                    wildcard: '%QUERY'
                }
            });
            tournament.initialize();
            $('#tbTournament').typeahead({
                hint: true,
                highlight: true,
                minLength: 1,
                dir: true
            }, {
                    name: 'search-course',
                    displayKey: 'Name',
                    source: tournament.ttAdapter(),
                    limit: 20,
                    dir: true,
                    templates: {
                        empty: [
                            '<div class="empty-message">',
                            '' + Messages.noResultFound + '',
                            '</div>'
                        ].join('\n'),
                        suggestion: Handlebars.compile([
                            '<div class="media">',
                            '<div class="pull-left">',
                            '<div class="media-object">',
                            '</div>',
                            '</div>',
                            '<div class="media-body">',
                            ' ',
                            ' <h5 class="media-heading">{{Name}}-{{NameEn}} </h5>',
                            '</div>',
                            '</div>'
                        ].join(''))
                    }
                }).on('typeahead:selected', function ($e, datum) {
                    $("#tbTournament").attr('data-id', datum.Id);
                });
        }
    };

    var openTournamentDataTable = function () {
        $('#tblTournament').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },

            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/getOpenTournamentDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[7, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "Id", "value": $("#txtTournamentSearch").attr("data-Id") },
                    { "name": "Type", "value": $("#ddlType").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '10%', "mDataProp": "Image", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "Name", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "Place" },
                //{ "sType": "html", "sWidth": '10%', "mDataProp": "StartDate", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "RegistrationStartDate", "bSortable": false },
                { "sType": "html", "sWidth": '10%', "mDataProp": "NAgeCategory" },
                { "sType": "html", "sWidth": '10%', "mDataProp": "TypeAr" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "Dname", "sClass": "tdCenter", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {


                $('td:eq(7)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnGetPlayers" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i>التسجيل</a>' +
                    ' </li>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                $('td:eq(0)', nRow).html('<img  style="width: 100px;" alt="" src="/Content/UploadedFile/Albums/Thumbnail/' + aData.Image + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Account/Avatar/NoImage.png\';"/>');
                //$('td:eq(1)', nRow).html(joinString(aData.Name, aData.NameEn));
                //$('td:eq(3)', nRow).html(joinString(aData.StartDate, aData.EndDate));
                //$('td:eq(2)', nRow).html(joinString(aData.Place, aData.PlaceEn));
                $('td:eq(3)', nRow).html(joinString(aData.RegistrationStartDate, aData.RegistrationEnDate));
                //$('td:eq(5)', nRow).html(joinString(aData.PCategoryAr, aData.PCategoryEn));
                //$('td:eq(6)', nRow).html(joinString(aData.TypeAr, aData.TypeEn));

                $(nRow).dblclick(function () {
                    SaveRegisterPalyerInTournamentModal($(this).find(".btnGetPlayers").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getRegisterPalyerInTournamentModal();
                //BindPermission();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var SaveRegisterPalyerInTournamentModal = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/RegisterPalyerInTournamentModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                playerTournamentInDataTable();
                playerTournamentOutDataTable();
                handleDatePickers();
                rejectSelected();
                approveSelected();
                printApprovedPlayer();
            });
        }, 100);
    }
    var getRegisterPalyerInTournamentModal = function () {
        var bsModal = $("#basicModal");
        $(".btnGetPlayers").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/RegisterPalyerInTournamentModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    playerTournamentInDataTable();
                    playerTournamentOutDataTable();

                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveTournament();
                    handleDatePickers();
                });
            }, 100);
        });
    };
    var playerTournamentInDataTable = function () {
        $('#tblPlayerTournamentIn').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "lengthMenu": [[20, 35, 70, 100, 200], [20, 35, 70, 100, 200]],
            "iDisplayLength": 40,
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/PlayerTournamentInDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[7, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "Id", "value": $("#tournamentId").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '20%', "mDataProp": "MemberNameAr", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '15%', "mDataProp": "MemberShipId", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '10%', "mDataProp": "DNameAr" },
                { "sType": "html", "sWidth": '10%', "mDataProp": "CategoryAr" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "ClubNameAr" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Status" },
                { "sType": "html", "sWidth": '2%', "mDataProp": "Id", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $(nRow).attr("data-id", aData.Id);
                if (aData.Status === 1) {
                    $('td:eq(5)', nRow).html('<span class="label label-sm label-danger">قيد الانتظار</span>')
                } else if (aData.Status === 2) {
                    $('td:eq(5)', nRow).html('<span class="label label-sm label-success">مقبول</span>')
                } else {
                    $('td:eq(5)', nRow).html('<span class="label label-sm label-danger">مرفوض</span>')
                }
                $('td:eq(6)', nRow).addClass('chkTd');

                $('td:eq(6)', nRow).html('<label class="mt-checkbox mt-checkbox-outline">' +
                    '<input type = "checkbox" class="rid" id="cb_' + aData.Id + '"  name = "test">' +
                    '<span></span>' +
                    '</label>')
                $('td:eq(7)', nRow).addClass("tooltd");
                $('td:eq(7)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnApprove" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i>قبول</a>' +
                    ' </li>' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnReject" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i>رفــــض</a>' +
                    ' </li>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');

            },
            "fnDrawCallback": function (oSettings) {
                approvePlayerPrivateTournament();
                rejectPlayerPrivateTournament();
                getSavePlayerInTournamentModal();
                $(".Cb_checkAll").off("change").change(function () {
                    var ischecked = this.checked;
                    var parent = $(this).closest('table');
                    $(parent).find('input').each(function () {
                        $(this).prop("checked", ischecked);
                    })
                })
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var playerTournamentOutDataTable = function () {
        $('#tblPlayerTournamentOut').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "lengthMenu": [[20, 35, 70, 100, 200], [20, 35, 70, 100, 200]],
            "iDisplayLength": 40,
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/PlayerTournamentOutDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[6, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "Id", "value": $("#tournamentId").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '20%', "mDataProp": "Name", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "Email", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "PhoneNumber" },
                { "sType": "html", "sWidth": '10%', "mDataProp": "CategoryAr" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Status" },
                { "sType": "html", "sWidth": '2%', "mDataProp": "Id", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $(nRow).attr("data-id", aData.Id);

                if (aData.Status === 1) {
                    $('td:eq(4)', nRow).html('<span class="label label-sm label-danger">قيد الانتظار</span>')
                } else if (aData.Status === 2) {
                    $('td:eq(4)', nRow).html('<span class="label label-sm label-success">مقبول</span>')
                } else {
                    $('td:eq(4)', nRow).html('<span class="label label-sm label-danger">مرفوض</span>')
                }
                $('td:eq(5)', nRow).addClass('chkTd');
                $('td:eq(5)', nRow).html('<label class="mt-checkbox mt-checkbox-outline">' +
                    '<input type = "checkbox" class="rid" id="cb_' + aData.Id + '"  name = "test">' +
                    '<span></span>' +
                    '</label>');
                $('td:eq(6)', nRow).addClass("tooltd");

                $('td:eq(6)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnApprove" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i>قبول</a>' +
                    ' </li>' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnReject" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i>رفــــض</a>' +
                    ' </li>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');

                $(nRow).dblclick(function () {
                    //SaveRegisterPalyerInTournamentModal($(this).find(".btnGetPlayers").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                approvePlayerOpenTournament();
                rejectPlayerOpenTournament();
                getSavePlayerInTournamentModal();
                $(".Cb_checkAll").off("change").change(function () {
                    var ischecked = this.checked;
                    var parent = $(this).closest('table');
                    $(parent).find('input').each(function () {
                        $(this).prop("checked", ischecked);
                    })
                })
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var playerHostedCompetitiontDataTable = function () {
        $('#tblPlayerHostedCompetition').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "lengthMenu": [[20, 35, 70, 100, 200], [20, 35, 70, 100, 200]],
            "iDisplayLength": 40,
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/PlayerHostedCompetitionDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[6, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "Id", "value": $("#tournamentId").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '20%', "mDataProp": "Name", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '15%', "mDataProp": "Email", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '15%', "mDataProp": "PhoneNumber" },
                { "sType": "html", "sWidth": '10%', "mDataProp": "DNameAr" },
                { "sType": "html", "sWidth": '10%', "mDataProp": "CategoryAr" },
                { "sType": "html", "sWidth": '10%', "mDataProp": "CountryAr" },
                { "sType": "html", "sWidth": '10%', "mDataProp": "Attachments" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Status" },
                { "sType": "html", "sWidth": '2%', "mDataProp": "Id", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                if (aData.PDId) {
                    $(nRow).attr("data-id", aData.PDId);
                    //$(nRow).attr("data-position", 2);
                } else {
                    $(nRow).attr("data-pid", aData.Id);
                    //$(nRow).attr("data-position", 1);
                }


                $('td:eq(6)', nRow).html('<a download="' + aData.Name + '" href="/Content/UploadedFile/Competitions/' + aData.Attachments + '" class="label label-sm label-default">تحميل</a>');


                if (aData.Status === 1) {
                    $('td:eq(7)', nRow).html('<span class="label label-sm label-danger">قيد الانتظار</span>')
                } else if (aData.Status === 2) {
                    $('td:eq(7)', nRow).html('<span class="label label-sm label-success">مقبول</span>')
                } else {
                    $('td:eq(7)', nRow).html('<span class="label label-sm label-danger">مرفوض</span>')
                }
                $('td:eq(8)', nRow).addClass('chkTd');
                $('td:eq(8)', nRow).html('<label class="mt-checkbox mt-checkbox-outline">' +
                    '<input type = "checkbox" class="rid" id="cb_' + (aData.PDId ? aData.PDId : aData.Id) + '"  name = "test">' +
                    '<span></span>' +
                    '</label>');
                $('td:eq(9)', nRow).addClass("tooltd");

                $('td:eq(9)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnApprove" ' + (aData.PDId ? '" data-id="' + aData.PDId : '" data-pid="' + aData.Id ) + '"><i class="fa fa-edit fa-fw"></i>قبول</a>' +
                    ' </li>' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnReject" ' + (aData.PDId ? '" data-id="' + aData.PDId : '" data-pid="' + aData.Id) + '"><i class="fa fa-edit fa-fw"></i>رفــــض</a>' +
                    ' </li>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');

                $(nRow).dblclick(function () {
                    //SaveRegisterPalyerInTournamentModal($(this).find(".btnGetPlayers").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                approveRejectPlayerHostedCompetition();
                getSavePlayerInTournamentModal();
                $(".Cb_checkAll").off("change").change(function () {
                    var ischecked = this.checked;
                    var parent = $(this).closest('table');
                    $(parent).find('input').each(function () {
                        $(this).prop("checked", ischecked);
                    })
                })
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var getSavePlayerInTournamentModal = function () {
        var bsModal = $("#basicModal2");
        $(".btnSavePlayerInTournament").off('click').click(function () {
            var tId = $("#tournamentId").val();
            bsModal.html('');
            var id = $(this).attr("data-id");
            if (id === "6054") {
                window.open("/Agenda/Competition?id=" + tId, "_blank");
            }
            else if (id === "6041") { // مشاركة خارجية
                setTimeout(function () {
                    bsModal.load("/" + lang + '/ControlPanel/OpenTournamentRegister?Id=' + tId + '', function () {
                        bsModal.modal('show');
                        savePlayerInOpenTournament();
                        resetbooststrapSelect();
                        handleBootstrapSelect();
                        saveTournament();
                        handleDatePickers();
                    });
                }, 100);
            }
            else {
                setTimeout(function () {
                    bsModal.load("/" + lang + '/ControlPanel/PrivateTournamentRegister?Id=' + tId + '', function () {
                        bsModal.modal('show');
                        savePlayerInPrivateTournament();
                        memberSearchAutoComplete(54);
                        resetbooststrapSelect();
                        handleBootstrapSelect();
                        saveTournament();
                        handleDatePickers();
                    });
                }, 100);
            }

        });
    };
    var savePlayerInPrivateTournament = function () {
        $('#RegisterPlayerInPrivateTournament').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "LstDiscipline", value: $("#ddlDisciplines").val() });
            postData.push({ name: "PlayerId", value: $("#tbMemberName").data("id") });
            postData.push({ name: "TournamentId", value: $("#tournamentId").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        $('#tblPlayerTournamentIn').dataTable().fnDraw();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var savePlayerInOpenTournament = function () {
        $('#RegisterPlayerInOpenTournament').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "LstDiscipline", value: $("#ddlDisciplines").val() });
            postData.push({ name: "TournamentId", value: $("#tournamentId").val() });

            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        $('#tblPlayerTournamentOut').dataTable().fnDraw();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };

    //--
    var approvePlayerPrivateTournament = function () {
        $(".btnApprove").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('سوف يتم اعتماد اللاعب للبطولة ! هل انت متاكد', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/ApprovePlayerPrivateTournament',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                $('#tblPlayerTournamentIn').dataTable().fnDraw();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var rejectPlayerPrivateTournament = function () {
        $(".btnReject").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('سوف يتم رفض اللاعب من البطولة ! هل انت متاكد', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/RejectPlayerPrivateTournament',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                $('#tblPlayerTournamentIn').dataTable().fnDraw();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var rejectPlayerOpenTournament = function () {
        $(".btnReject").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('سوف يتم رفض اللاعب من البطولة ! هل انت متاكد', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/RejectPlayerOpenTournament',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                $('#tblPlayerTournamentOut').dataTable().fnDraw();
                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var approvePlayerOpenTournament = function () {
        $(".btnApprove").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('سوف يتم اعتماد اللاعب للبطولة ! هل انت متاكد', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/ApprovePlayerOpenTournament',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                $('#tblPlayerTournamentOut').dataTable().fnDraw();
                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };

    var approveRejectPlayerHostedCompetition = function () {
        $(".btnApprove").off('click').click(function () {
            var id = $(this).attr('data-Id');
            var pid = $(this).attr('data-pid');
            var tid = $("#tournamentId").val();
            gsConfirm('سوف يتم اعتماد اللاعب للبطولة ! هل انت متاكد', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/ApproveRejectPlayerHostedCompetition',
                        dataType: "JSON",
                        data: { 'tid': tid, 'ids': id, 'pids': pid,'status':2 },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                $('#tblPlayerHostedCompetition').dataTable().fnDraw();
                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });

        $(".btnReject").off('click').click(function () {
            var id = $(this).attr('data-Id');
            var pid = $(this).attr('data-pid');
            var tid = $("#tournamentId").val();
            gsConfirm('سوف يتم رفض اللاعب من البطولة ! هل انت متاكد', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/ApproveRejectPlayerHostedCompetition',
                        dataType: "JSON",
                        data: { 'tid': tid, 'ids': id, 'pids': pid, 'status': 3 },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                $('#tblPlayerHostedCompetition').dataTable().fnDraw();
                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };

    var rejectSelected = function () {
        $(".btnRejectSelected").off('click').click(function () {
            var ids = '';
            var pids = '';
            var tid = $("#tournamentId").val();
            var ttype = $(this).attr('data-Id');
            $(this).closest('.portle-body').find('.rid').each(function () {
                var isChecked = $(this).is(":checked");

                if (isChecked === true) {
                    if ($(this).closest('tr').attr('data-id'))
                        ids = $(this).closest('tr').attr('data-id') + ',' + ids;
                    if ($(this).closest('tr').attr('data-pid'))
                        pids = $(this).closest('tr').attr('data-pid') + ',' + pids;
                }
            });
            if (ttype === "6041") {
                gsConfirm('سوف يتم رفض اللاعبين المحددين ! هل انت متاكد', function (result) {
                    if (result) {
                        $.ajax({
                            type: "POST",
                            cache: false,
                            url: '/ControlPanel/RejectGroupPlayerOpenTournament',
                            dataType: "JSON",
                            data: { 'ids': ids, tId: $("#tournamentId").val() },
                            success: function (data) {
                                if (data.cStatus === "success") {
                                    gsNotifyMsg(data.cMsg, data.cStatus);
                                    $('#tblPlayerHostedCompetition').dataTable().fnDraw();
                                } else {
                                    gsNotifyMsg(data.cMsg, data.cStatus);
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                gsNotifyMsg('' + Messages.noResultFound + '', "error");
                            }
                        });
                    }
                });

            }
            else if (ttype === "6040") {
                gsConfirm('سوف يتم رفض اللاعبين المحددين ! هل انت متاكد', function (result) {
                    if (result) {
                        $.ajax({
                            type: "POST",
                            cache: false,
                            url: '/ControlPanel/RejectGroupPlayerPrivateTournament',
                            dataType: "JSON",
                            data: { 'ids': ids, tId: $("#tournamentId").val() },
                            success: function (data) {
                                if (data.cStatus === "success") {
                                    gsNotifyMsg(data.cMsg, data.cStatus);
                                    $('#tblPlayerTournamentIn').dataTable().fnDraw();
                                } else {
                                    gsNotifyMsg(data.cMsg, data.cStatus);
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                gsNotifyMsg('' + Messages.noResultFound + '', "error");
                            }
                        });
                    }
                });

            }
            else {
                gsConfirm('سوف يتم رفض اللاعبين المحددين ! هل انت متاكد', function (result) {
                    if (result) {
                        $.ajax({
                            type: "POST",
                            cache: false,
                            url: '/ControlPanel/ApproveRejectPlayerHostedCompetition',
                            dataType: "JSON",
                            data: { 'tid':tid,'ids': ids, 'pids': pids, 'status':3 },
                            success: function (data) {
                                if (data.cStatus === "success") {
                                    gsNotifyMsg(data.cMsg, data.cStatus);
                                    $('#tblPlayerHostedCompetition').dataTable().fnDraw();
                                } else {
                                    gsNotifyMsg(data.cMsg, data.cStatus);
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                gsNotifyMsg('' + Messages.noResultFound + '', "error");
                            }
                        });
                    }
                });

            }
        });
    };
    var approveSelected = function () {
        $(".btnApproveSelected").off('click').click(function () {
            debugger;
            var ids = '';
            var pids = '';
            var tid = $("#tournamentId").val();
            var ttype = $(this).attr('data-Id');
            $(this).closest('.portle-body').find('.rid').each(function () {
                var isChecked = $(this).is(":checked");

                if (isChecked === true) {
                    if ($(this).closest('tr').attr('data-id'))
                        ids = $(this).closest('tr').attr('data-id') + ',' + ids;
                    if ($(this).closest('tr').attr('data-pid'))
                        pids = $(this).closest('tr').attr('data-pid') + ',' + pids;
                }
            });
            if (ttype === "6041") {
                gsConfirm('سوف يتم اعتماد اللاعبين المحددين ! هل انت متاكد', function (result) {
                    if (result) {
                        $.ajax({
                            type: "POST",
                            cache: false,
                            url: '/ControlPanel/ApproveGroupPlayerOpenTournament',
                            dataType: "JSON",
                            data: { 'ids': ids, tId: $("#tournamentId").val() },
                            success: function (data) {
                                if (data.cStatus === "success") {
                                    gsNotifyMsg(data.cMsg, data.cStatus);
                                    $('#tblPlayerTournamentOut').dataTable().fnDraw();
                                } else {
                                    gsNotifyMsg(data.cMsg, data.cStatus);
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                gsNotifyMsg('' + Messages.noResultFound + '', "error");
                            }
                        });
                    }
                });

            }
            else if(ttype===6040) {
                gsConfirm('سوف يتم اعتماد اللاعبين المحددين ! هل انت متاكد', function (result) {
                    if (result) {
                        $.ajax({
                            type: "POST",
                            cache: false,
                            url: '/ControlPanel/ApproveGroupPlayerPrivateTournament',
                            dataType: "JSON",
                            data: { 'ids': ids, tId: $("#tournamentId").val() },
                            success: function (data) {
                                if (data.cStatus === "success") {
                                    gsNotifyMsg(data.cMsg, data.cStatus);
                                    $('#tblPlayerTournamentIn').dataTable().fnDraw();
                                } else {
                                    gsNotifyMsg(data.cMsg, data.cStatus);
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                gsNotifyMsg('' + Messages.noResultFound + '', "error");
                            }
                        });
                    }
                });

            }
            else {
                gsConfirm('سوف يتم اعتماد اللاعبين المحددين ! هل انت متاكد', function (result) {
                    if (result) {
                        $.ajax({
                            type: "POST",
                            cache: false,
                            url: '/ControlPanel/ApproveRejectPlayerHostedCompetition',
                            dataType: "JSON",
                            data: { 'tid': tid, 'ids': ids, 'pids': pids, 'status':2 },
                            success: function (data) {
                                if (data.cStatus === "success") {
                                    gsNotifyMsg(data.cMsg, data.cStatus);
                                    $('#tblPlayerHostedCompetition').dataTable().fnDraw();
                                } else {
                                    gsNotifyMsg(data.cMsg, data.cStatus);
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                gsNotifyMsg('' + Messages.noResultFound + '', "error");
                            }
                        });
                    }
                });

            }
        });
    };


    var printApprovedPlayer = function () {
        $(".btnPrintApprovedPlayer").off('click').click(function () {
            var id = $("#tournamentId").val();
            var ttype = $(this).attr('data-Id');
            var url = "";
            if (ttype === "6041") {
                url = "/ControlPanel/PrintApprovedPlayerOpenTournament?id=" + id;
            }
            else if (ttype === "6040") {
                url = "/ControlPanel/PrintApprovedPlayerPrivateTournament?id=" + id;
            }
            else {
                url = "/ControlPanel/PrintApprovedPlayerHostedCompetition?id=" + id;
            }
            var printWindow = window.open(url, 'Print', 'left=200, top=100, width=950, height=500, toolbar=0, resizable=0');
            printWindow.addEventListener('load', function () {
                printWindow.print();
                printWindow.close();
            }, true);
        });
    };
    //--
    var courseDataTable = function () {
        $('#tblCourse').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/getCourseDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[6, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "Id", "value": $("#txtCourseSearch").attr("data-Id") },
                    { "name": "FromDate", "value": $("#tbsFromDate").val() },
                    { "name": "ToDate", "value": $("#tbsToDate").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "Name" : "NameEn", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '15%', "mDataProp": lang === "ar" ? "Place" : "PlaceEn" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "StartDate", "bSortable": false },
                { "sType": "html", "sWidth": '10%', "mDataProp": "Hours" },
                { "sType": "html", "sWidth": '15%', "mDataProp": "AvailableSeat" },
                { "sType": "html", "sWidth": '15%', "mDataProp": "DName", "sClass": "tdCenter", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {


                $('td:eq(6)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveCourse" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteCourse" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                //$('td:eq(0)', nRow).html(joinString(aData.CourseName, aData.CourseNameEn));
                //$('td:eq(1)', nRow).html(joinString(aData.Place, aData.PlaceEn));
                $('td:eq(2)', nRow).html(joinString(aData.StartDate, aData.EndDate));
                $(nRow).dblclick(function () {
                    SaveCourseModel($(this).find(".btnSaveCourse").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveCourseModal();
                deleteCourse();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var courseDataTableUpdate = function () {
        var oTable = $('#tblCourse').dataTable();
        oTable.fnDraw(false);
    };
    var searchCourses = function () {
        $("#btnSearch").off("click").click(function () {
            courseDataTableUpdate();
        });
    };
    var resetCourses = function () {
        $("#btnClearForm").off("click").click(function () {
            $("#tbCourse").removeAttr("data-id");
            gsResetInsertForm("SearchForm");
            courseDataTableUpdate();
        });
    };
    var SaveCourseModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveCourseModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                courseProgramsDataTable();
                saveCourse();
                handleDatePickers();
            });
        }, 100);
    };
    var getSaveCourseModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveCourse").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveCourseModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    courseProgramsDataTable();
                    saveCourse();
                    handleDatePickers();
                });
            }, 100);
        });
    };
    var saveCourse = function () {
        $('#SaveCourseForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "ConTargetGroup", value: $("#ddlConTargetGroup").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        $("#tabcp").removeAttr("style")
                        courseDataTableUpdate();
                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteCourse = function () {
        $(".btnDeleteCourse").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteCourse',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                courseDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };

    var courseProgramsDataTable = function () {
        $('#tblCoursePrograms').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/" + lang + "/ControlPanel/getCourseProgramsDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[4, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "CourseId", "value": $("#tbCourseId").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "Material" : "MaterialEn", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '15%', "mDataProp": lang === "ar" ? "Lecturer" : "LecturerEn" },
                { "sType": "html", "sWidth": '20%', "mDataProp": "StartDateTime", "bSortable": false },
                { "sType": "html", "sWidth": '10%', "mDataProp": "Duration" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {


                $('td:eq(4)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveCoursePrograms" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteCoursePrograms" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                //$('td:eq(0)', nRow).html(joinString(aData.Material, aData.MaterialEn));
                //$('td:eq(1)', nRow).html(joinString(aData.Lecturer, aData.LecturerEn));
                $(nRow).dblclick(function () {
                    SaveCourseProgramsModel($(this).find(".btnSaveCoursePrograms").attr("data-id"), $("#basicModal2"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveCourseProgramsModal();
                deleteCoursePrograms();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var courseProgramsDataTableUpdate = function () {
        var oTable = $('#tblCoursePrograms').dataTable();
        oTable.fnDraw(false);
    };
    var SaveCourseProgramsModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load("/" + lang + '/ControlPanel/SaveCourseProgramsModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                saveCoursePrograms();
                $('#tbStartDateTime').datetimepicker({
                    format: 'YYYY-MM-DD HH:mm',
                });
            });
        }, 100);
    }
    var getSaveCourseProgramsModal = function () {
        var bsModal = $("#basicModal2");
        $(".btnSaveCoursePrograms").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load("/" + lang + '/ControlPanel/SaveCourseProgramsModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveCoursePrograms();
                    $('#tbStartDateTime').datetimepicker({
                        format: 'YYYY-MM-DD HH:mm'
                    });
                });
            }, 100);
        });
    };
    var saveCoursePrograms = function () {
        $('#SaveCourseProgramsForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "CourseId", value: $("#tbCourseId").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        courseProgramsDataTableUpdate();
                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteCoursePrograms = function () {
        $(".btnDeleteCoursePrograms").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteCoursePrograms',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                courseProgramsDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };


    return {
        initNews: function() {
            newsDataTable($("#tblNews").attr("data-categoryid"));
            newsSearchAutoComplete();
            newsSearch();
            resetNewsDataTable();
            handleDatePickers();
        },
        initCategory: function() {
            categoriesDataTable();
        },
        initMedia: function() {
            AlbumsDataTable();
            albumSearchAutoComplete();
            albumSearch();
            resetAlbumDataTable();
            mediaDataTable();
        },
        initAttachments: function() {
            attachmentsDataTable();
            attachmentSearchAutoComplete();
            attachmentSearch();
            resetAttachmentsDataTable();
        },
        initStaticPages: function() {
            StaticPagesDataTable();
            handleSummernote();
            closeModal();
            uploadImg($("#imgUploadUser"), $("#hdImage"));
            uploadImg($("#imgUploadUser2"), $("#hdImage2"));
            uploadImg($("#imgUploadUser3"), $("#hdImage3"));

            saveStaticPages();
        },
        initAds: function() {
            adsDataTable();
        },
        initPlayersInNewsSite: function() {
            playersInNewsSiteDataTable();
        },
        initSocial: function() {
            saveSN();
        },
        initContactUs() {
            contactUsDataTable();
        },
        initAppSettings() {
            appSettingsDataTable();
        },
        initImportantLinks: function() {
            importantLinksDataTable();
        },
        initClubs: function () {
            handleBootstrapSelect();
            resetClubsDataTable();
            clubsDataTable();
            clubsSearchAutoComplete();
            clubsSearch();
            getAddClubModal();

        },
        initMembers: function() {
            membersDataTable($("#tblMembers").attr("data-memberType"));
            resetMembersDataTable();
            //getAddMemberModal();
            getSaveMemberModal();
            memberSearchAutoComplete();
            $("#btnSearch").off("click").click(function() {
                membersDataTableUpdate();
            });
            $("#btnClearForm").off("click").click(function() {
                $("#tbMemberName").removeAttr("data-id");
                $('#tbMemberName').typeahead('val', '');
                membersDataTableUpdate();

            });
        },
        initManagers: function() {
            managersDataTable();
            resetMembersDataTable();
            //getAddMemberModal();
            getSaveMemberModal();
            memberSearchAutoComplete();
            $("#btnSearch").off("click").click(function() {
                membersDataTableUpdate();
            });
            $("#btnClearForm").off("click").click(function() {
                $("#tbMemberName").removeAttr("data-id");
                $('#tbMemberName').typeahead('val', '');
                membersDataTableUpdate();

            });
        },
        initUnApprovedMembers: function() {
            unApprovedMembersDataTable();
            resetMembersDataTable();
            memberSearchAutoComplete();
            getMembersChangeStatusModal();
            $("#btnSearch").off("click").click(function() {
                unApprovedMembersDataTableUpdate();
            });
            $("#btnClearForm").off("click").click(function() {
                $("#tbMemberName").removeAttr("data-id");
                $('#tbMemberName').typeahead('val', '');
                unApprovedMembersDataTableUpdate();

            });
            $("#cbSelectAll").off("click").click(function () {
                var isChecked = $(this).prop("checked");
                $(".cbSelect").prop("checked", isChecked);
                if (isChecked) {
                    $("#cbSelectAll").parent().addClass("checked");
                } else {
                    $("#cbSelectAll").parent().removeClass("checked");
                }
            });
        },
        initRegisterMember: function () {
            uploadImg($("#imgUploadUser"), $("#hdImage"));
            addMember();
            handleDatePickers();

        },
        initAgenda: function () {
            handleBootstrapSelect();
            handleDatePickers();
            agendasDataTable();
            searchAgendas();
            resetAgendas();
            agendasSearchAutoComplete();
        },
        initDisciplines: function() {
            handleBootstrapSelect();
            disciplinesSearchAutoComplete();
            disciplinessDataTable();
            disciplinesSearch();
            resetDisciplinesDataTable();
        },
        initTournaments: function () {
            searchTournamentsDataTable();
            resetTournamentsDataTable();
            handleBootstrapSelect();
            handleDatePickers();
            tournamentDataTable();
            tournamentSearchAutoComplete();
        },
        initTournament: function() {
            uploadAlbums();
            resetbooststrapSelect();
            handleBootstrapSelect();
            saveTournament();
            handleDatePickers();
            ////
            playerTournamentInDataTable();
            playerTournamentOutDataTable();
            playerHostedCompetitiontDataTable();
            rejectSelected();
            approveSelected();
            printApprovedPlayer();
        },
        initRegisterPlayerTournament: function() {
            openTournamentDataTable();
            //BindPermission();
        },
        initCourse: function () {
            courseSearchAutoComplete();
            handleBootstrapSelect();
            handleDatePickers();
            searchCourses();
            resetCourses();
            courseDataTable();
        },
        initRegisterClub: function () {
            uploadImg($("#imgUploadUser"), $("#hdImage"));
            addClub();
            handleDatePickers();

        },
        initUnApprovedClubs: function() {
            unApprovedClubsDataTable();
            getClubsChangeStatusModal();
            $("#btnSearch").off("click").click(function () {
                unApprovedClubsDataTableUpdate();
            });
            $("#btnClearForm").off("click").click(function () {
                $("#tbClubsName").removeAttr("data-id");
                $('#tbClubsName').typeahead('val', '');
                unApprovedClubsDataTableUpdate();

            });
            $("#cbSelectAll").off("click").click(function () {
                var isChecked = $(this).prop("checked");
                $(".cbSelect").prop("checked", isChecked);
                if (isChecked) {
                    $("#cbSelectAll").parent().addClass("checked");
                } else {
                    $("#cbSelectAll").parent().removeClass("checked");
                }
            });
        },
        initAgeCategory: function() {
            AgeCategoryDataTable();
        }

    };
}();