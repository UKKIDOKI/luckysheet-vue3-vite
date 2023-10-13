<template>
    <div>
        <the-header/>
        <div style="margin: 0px; background-color: rgb(249 253 255 / 46%);">
            <div style="margin: 0 auto; position: relative; width: 1030px;">
                <div style="position: relative;">
                    <div style="display: flex; list-style:none; justify-content: center; ">      
                        <li @click="createSheet">  
                            <div class="card" style="width: 13rem; height: 13rem; margin: 10px; padding: 10px; justify-content: center;">
                                <img :src="imgUrl" class="card-img-top" alt="...">
                            </div>
                            <p style="margin-left: 10px; text-align: center;">
                                새로운 스프레드시트 만들기
                            </p>
                        </li>
                        <li v-for="(item,index) in limitFileList" :key="index" @click="goSheetPage(item)">
                            <div class="card" style="width: 13rem; height: 13rem; margin: 10px; justify-content: center;">
                                <img :src="item.images" class="card-img-top" alt="...">
                            </div>
                            <p style="margin-left: 10px; text-align: center;">
                            {{ item.doc_name }}
                            </p>
                        </li>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div style="margin: 30px;">
            <div style="margin: 0 auto; position: relative; width: 1030px;">
                <div style="list-style:none;">
                    <div style="position: relative; margin-bottom: 50px;">
                        <div style="display: flex; position: relative;">
                            <div style="width: 45%; text-align: center;">
                                파일명
                            </div>
                            <div style="flex: 1; text-align: center;">
                                작성자
                            </div>
                            <div style="flex: 1; text-align: center;">
                                마지막 수정일시
                            </div>
                            <div style="flex: 1; text-align: center;">
                                파일 생성일시
                            </div>
                        </div>
                    </div>
                    <li @click="goSheetPage(item)" v-for="(item,index) in recentList" :key="index" style="height: 50px;">
                        <div style="display: flex; position: relative; border-bottom: 1px solid #e3e3e3; align-items: center; height: 100%; ">
                            <div class="truncate-text" style="width: 45%; text-align: center;"> 
                                {{ item.doc_name }}
                            </div>
                            <div style="flex: 1">
                            </div>
                            <div class="truncate-text" style="flex: 1; text-align: center;">
                                {{ item.updated_on }}
                            </div>
                            <div class="truncate-text" style="flex: 1; text-align: center;">
                                {{ item.created_on }}
                            </div>
                        </div>
                    </li>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import TheHeader from '../components/TheHeader.vue';
import { fetchCreateSheet, fetchRecentList } from '../api/index'
import { useRouter } from 'vue-router';
import { ref,onBeforeMount, computed } from 'vue'
import { useSheetStore } from '../store/store';
import imgUrl from '../assets/logo.png'

const router = useRouter();
const store = useSheetStore()

const recentList = ref([]);
onBeforeMount(async() => {
    const {data} = await fetchRecentList(); 
    for (let i = 0; i < data.data.length; i++) {
        recentList.value.push(data.data[i])
    } 
})

const createSheet =  async () => {
    const {data} = await fetchCreateSheet()
    store.sheetItem.doc_name = '제목 없는 스프레드시트'
    router.push({
        name: 'sheet',
        query: {
            share : data.data
        }
    })
}
const goSheetPage = (item) => {
    store.sheetItem = item;
    router.push(
        {
        name: 'sheet',
        query: {
            share : item.list_id
        }
        }
    )
}
const limitFileList = computed(()=> {
    return recentList.value.slice(0,4)
})



</script>

<style scoped>
.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px; /* 원하는 너비 설정 */
}


</style>