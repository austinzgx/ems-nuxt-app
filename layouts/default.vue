<template>
  <div h-100vh select-none text-center>
    <Header />
    <div style="height: calc(100vh - 90px);" overflow-y-scroll p2 border-y="~ 1px solid gray/40 ">
      <slot />
    </div>
    <Footer h-30px />
  </div>
</template>
