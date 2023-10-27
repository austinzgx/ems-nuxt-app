<template>
  <div grid="~ rows-[60px_auto_30px]" h-100vh select-none text-center>
    <Header m2 />
    <div overflow-y-scroll pb-5>
      <slot />
    </div>
    <Footer bottom-2 bg-green:5 />
  </div>
</template>
