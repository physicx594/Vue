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

<style lang="scss">
$primary : #264710;

.checkoutNav{
    margin: 96px auto 30px;
    display: flex;
    .step{
        position: relative;
        width: 240px;
        height: 70px;
        color: #CED4DA;
        &::before{
            content:counter(step);
            counter-increment: step;
            display:block;
            color: white;
            width: 25px;
            height: 25px;
            line-height: 25px;
            margin: 5px auto;
            border-radius: 50%;
            background-color: #CED4DA;
        }
        &::after{
            content:'';
            position: absolute;
            top: 17.5px;
            left: -50%;
            width: 100%;
            height: 2px;
            background-color: #CED4DA;
            z-index: -1;
        }
        &:first-child:after {
            content:none;
        }
    }
    .step.active{
        color: green;
        &::before{
            background-color: green;
        }
    }
    .step.finished{
        & + .step::after{
            height: 2px;
            background-color: green;
        }
    }
}
</style>
