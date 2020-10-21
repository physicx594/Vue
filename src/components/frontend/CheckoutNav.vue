<template>
    <div class="checkoutNav">
        <div class="step" :class="{active: step1}"><div>購物車</div></div>
        <div class="step" :class="{active: step2}"><div>填寫資料</div></div>
        <div class="step" :class="{active: step3}"><div>訂單確認</div></div>
    </div>
</template>

<script>
export default {
  props: ['step1', 'step2', 'step3']

}
</script>
