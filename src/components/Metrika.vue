<template>
    <div>
      <img
        src="https://top-fwz1.mail.ru/counter?id=3468047;js=na"
        style="position: absolute; left: -9999px;"
        alt="Top.Mail.Ru"
      />
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  
  const loadTopMailRuScript = () => {
    var _tmr = window._tmr || (window._tmr = []);
    _tmr.push({ id: "3468047", type: "pageView", start: new Date().getTime() });
    if (document.getElementById("tmr-code")) return;
    var ts = document.createElement("script");
    ts.type = "text/javascript";
    ts.async = true;
    ts.id = "tmr-code";
    ts.src = "https://top-fwz1.mail.ru/js/code.js";
    var f = function () {
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(ts, s);
    };
    if (window.opera == "[object Opera]") {
      document.addEventListener("DOMContentLoaded", f, false);
    } else {
      f();
    }
  };
  
  onMounted(() => {
    loadTopMailRuScript();
  });
  </script>
  