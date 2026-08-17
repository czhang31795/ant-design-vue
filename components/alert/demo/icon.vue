<docs>
---
order: 4
title:
  zh-CN: 图标
  en-US: Icon
---

## zh-CN

可口的图标让信息类型更加醒目。

## en-US

Decent icon make information more clear and more friendly.

</docs>

<template>
  <xy-space direction="vertical" style="width: 100%">
    <xy-alert message="Success Tips" type="success" show-icon />
    <xy-alert message="Informational Notes" type="info" show-icon />
    <xy-alert message="Warning" type="warning" show-icon />
    <xy-alert message="Error" type="error" show-icon />
    <xy-alert
      message="Success Tips"
      description="Detailed description and advices about successful copywriting."
      type="success"
      show-icon
    />
    <xy-alert
      message="Informational Notes"
      description="Additional description and informations about copywriting."
      type="info"
      show-icon
    />
    <xy-alert
      message="Warning"
      description="This is a warning notice about copywriting."
      type="warning"
      show-icon
    />
    <xy-alert
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      show-icon
    />
  </xy-space>
</template>
