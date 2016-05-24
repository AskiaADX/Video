(function () {
    var video = new Video({
        instanceId: {%= CurrentADC.InstanceId %},
        autosubmit: {%= CurrentADC.PropValue("autosubmit") %},
        javascriptSupport: {%= Browser.Support("javascript") %},
        controls: {%= On(CurrentADC.PropValue("controls") <> "true",0,1) %},
        autoplay: {%= On(CurrentADC.PropValue("autoplay") <> "true",0,1) %},
        android: {%= On(Browser.UserAgent.IndexOf("Android") >= 1 or Browser.UserAgent.IndexOf("IEMobile") >= 1,1,0) %}
    });
} ());