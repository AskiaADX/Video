(function () {
    /**
   * Add event listener in DOMElement
   *
   * @param {HTMLElement} obj HTMLElement which should be listen
   * @param {String} type Type of the event to listen
   * @param {Function} fn Callback function
   */
    function addEvent(elem, event, fn) {
        // allow the passing of an element id string instead of the DOM elem
        if (typeof elem === "string") {
            elem = document.getElementById(elem);
        }

        function listenHandler(e) {
            var ret = fn.apply(this, arguments);
            if (ret === false) {
                e.stopPropagation();
                e.preventDefault();
            }
            return(ret);
        }

        function attachHandler() {
            // normalize the target of the event
            window.event.target = window.event.srcElement;
            // make sure the event is passed to the fn also so that works the same too
            // set the this pointer same as addEventListener when fn is called
            var ret = fn.call(elem, window.event);   
            // support an optional return false to be cancel propagation and prevent default handling
            // like jQuery does
            if (ret === false) {
                window.event.returnValue = false;
                window.event.cancelBubble = true;
            }
            return(ret);
        }

        if (elem.addEventListener) {
            elem.addEventListener(event, listenHandler, false);
        } else {
            elem.attachEvent("on" + event, attachHandler);
        }
    }
   
   /**
   * Disable right click on video
   *
   * @param {HTMLElement} obj HTMLElement
   */
    function disableRightClick(obj) {
        if (obj.addEventListener) {
            obj.addEventListener('contextmenu', function(e) {
                e.preventDefault();
            }, false);
        } else {
            obj.attachEvent('oncontextmenu', function() {
                window.event.returnValue = false;
                return false;
            });
        }
    }
    
   /**
   * Autosubmit
   */
    function myHandler(e) {
        document.getElementsByName("Next")[0].click();
    }

   /**
   * Creates a new instance of the video
   *
   * @param {Object} options Options of the ResponsiveTable
   * @param {String} options.instanceId=1 Id of the ADC instance
   */
   function Video(options) {
      this.options = options;
      this.instanceId = options.instanceId || 1;
      this.autosubmit = options.autosubmit || 0;
      this.javascriptSupport = options.javascriptSupport || 0;
      this.controls = options.controls || 0;
      this.autoplay = options.autoplay || 0;
       
      var myVideo = document.getElementById("adc_" + this.instanceId + "_video");
      var myObject = document.getElementById("adc_" + this.instanceId + "_object");
       
       if (!this.controls && this.autoplay) {
           if (myVideo.addEventListener) {
               disableRightClick(myVideo);
           } else {
               disableRightClick(myObject);
           }
       }

      if (this.autosubmit && this.javascriptSupport) {
        addEvent(myVideo,"ended",myHandler);
      }
   }

   /**
   * Attach the Video to the window object
   */
   window.Video = Video;

}());
