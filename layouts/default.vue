<template>
  <div h-100vh select-none text-center>
    <Header h-60px p2 />
    <div style="height: calc(100vh - 90px);" overflow-y-scroll pt2 border-b="~ 1px solid gray/40">
      <slot />
    </div>
    <Footer h-30px />
  </div>
</template>
