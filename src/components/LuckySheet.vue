<template>
  <div>
  <div style="display: flex; top: 0; height: 35px;">
    <!-- <input id="uploadBtn" style="width: 20%;" class="form-control" type="file" @change="loadExcel"/> -->
    <!-- <button @click="test">테스트</button> -->
    <!-- <label class="input-group-text" for="inputGroupFile02">Upload</label> -->

    <!-- <span class="common"> 템플릿 불러오기:</span> -->

    <!-- <select class="form-select" style="width: 20%;" aria-label="Default select example" v-model="selected" @change="selectExcel">
      <option disabled value="">Choose</option>
      <option v-for="option in options" :key="option.text" :value="option.value">
        {{ option.text }}
      </option>
    </select> -->
    <input class="common"  v-model="sheetName" style="flex: 1;" type="text"/>
    <button @click="changeDocName" class="btn btn-primary">파일명 변경</button>
    <div style="align-self: center; text-align: right; flex: 0.3;">
    <a href="/" style="text-align: right; flex: 0.3; margin-right: 10px;" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover common">메인페이지</a>
  </div>
    <div style="align-self: center">
    <a href="javascript:void(0)" @click="downloadExcel">
    <label style="align-self: center; margin-right: 3px;">파일내보내기</label>
    <i class="bi bi-download" style="text-align: right; margin-right: 10px; align-self: center"></i>
  </a>
  </div>
    <!-- <button class="btn btn-primary"  >현재 파일 다운받기</button> -->
  </div>
  <div style="margin-top: 15px;" ref="chartcapture" id="luckysheet"></div>
  <!-- <div v-show="isMaskShow" id="tip">Downloading</div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSheetStore } from '../store/store';
import { exportExcel } from '../utils/export'
// import { isFunction } from '../utils/is'
// import LuckyExcel from 'luckyexcel'
import { useRoute } from 'vue-router'
import { updateDocImage, updateDocName } from '../api/index'

// const isMaskShow = ref(false)
// const jsonData = ref({})


/**
 * 파일가져오기
 * */
// TODO : 파일가져와서 시트만들시 db저장 안되는 케이스 확인
// const loadExcel = (evt) => {
//   const files = evt.target.files
//   if (files == null || files.length == 0) {
//     alert('No files wait for import')
//     return
//   }
//   let name = files[0].name
//   let suffixArr = name.split('.'),
//     suffix = suffixArr[suffixArr.length - 1]
//   if (suffix != 'xlsx') {
//     alert('Currently only supports the import of xlsx files')
//     return
//   }
//   LuckyExcel.transformExcelToLucky(files[0], function (exportJson, luckysheetfile) {
//     if (exportJson.sheets == null || exportJson.sheets.length == 0) {
//       alert('Failed to read the content of the excel file, currently does not support xls files!')
//       return
//     }
//     console.log('exportJson', exportJson)
//     jsonData.value = exportJson

//     isFunction(window?.luckysheet?.destroy) && window.luckysheet.destroy()

//     window.luckysheet.create({
//       container: 'luckysheet', //luckysheet is the container id
//       showinfobar: false,
//       data: exportJson.sheets,
//       title: exportJson.info.name,
//       userInfo: exportJson.info.name.creator,
//     })
//   })
// }

/**
 * 썸네일 저장
 */
const setScreenshotSheet = async () => {
  const setImage = luckysheet.getScreenshot({range:"A1:J30"});
  try {
    await updateDocImage(gridKey, setImage);
  } catch (error) {
    console.log(error)
  }  
}


/**
 * 서버에 저장된 엑셀 양식 가져오기
 */
// const selectExcel = (evt) => {
//   const value = selected.value
//   const name = evt.target.options[evt.target.selectedIndex].innerText

//   if (value == '') {
//     return
//   }
//   isMaskShow.value = true

//   LuckyExcel.transformExcelToLuckyByUrl(value, name, (exportJson, luckysheetfile) => {
//     if (exportJson.sheets == null || exportJson.sheets.length == 0) {
//       alert('Failed to read the content of the excel file, currently does not support xls files!')
//       return
//     }
//     console.log('exportJson', exportJson)
//     jsonData.value = exportJson

//     isMaskShow.value = false

//     isFunction(window?.luckysheet?.destroy) && window.luckysheet.destroy()

//     window.luckysheet.create({
//       container: 'luckysheet', //luckysheet is the container id
//       showinfobar: false,
//       data: exportJson.sheets,
//       title: exportJson.info.name,
//       userInfo: exportJson.info.name.creator,
//     })
//   })
// }


const sheetData = ref({})
const dataLog = ref({})

/**
 * 시트2,3을 활성화 하지않고 파일다운로드 했을시 발생하는 오류 임시해결
 */
// TODO 활성화 하지않고 다운로드 할 경우 시트2,3의 데이터는 같이 다운로드 되지않음 
const fileDownload = () => {
  dataLog.value = luckysheet.getAllSheets();
  for(let index = 1; index < dataLog.value.length; index++) {
  sheetData.value = luckysheet.getSheetData({order:index})
  dataLog.value[index].data = sheetData.value;
  }
}
  
/**
 * 현재파일 다운로드
 */
const downloadExcel = () => {
  fileDownload();
  exportExcel(dataLog.value,sheetName.value)
}
const route = useRoute();
const gridKey = route.query.share;
let luckyUrl;
let luckyHostUrl;
// 시트 불러오기
onMounted(() => {
  if(import.meta.env.MODE === 'development') {
    luckyUrl = 'http://localhost:9004'
    luckyHostUrl = 'localhost:9004'
  } else {
    luckyUrl = location.origin
    luckyHostUrl = location.host
  }
  if(gridKey){
  luckysheet.create({
    container: 'luckysheet',
    userInfo:'lemon',
    myFolderUrl: '/',
    title:'Lemon HealthCare',
    allowUpdate:true,
    showinfobar:false,
    ShowstatisticBar:false,
    updateImageUrl: luckyUrl + "/luckysheet/api/updateImg",
    updateUrl: "ws://"+ luckyHostUrl +"/luckysheet/websocket/luckysheet",
    gridKey: gridKey,
    loadUrl: luckyUrl + "/luckysheet/api/load",
    loadSheetUrl: luckyUrl + "/luckysheet/api/loadsheet",
    hook: {
      updated : function() { // 시트의 정보가 업데이트 될때 발생하는 트리거
        setScreenshotSheet()
      }
    }
    })
    
  } else {
    luckysheet.create({
    container: 'luckysheet',
    title:'Lemon HealthCare',
    userInfo:'lemon',
    showinfobar:false,
    myFolderUrl: '/',
    functionButton:'<button ref="test" class="btn btn-primary" style="padding:3px 6px;font-size: 12px;margin-right: 10px;">download</button> <button id="" class="btn btn-primary btn-danger" style=" padding:3px 6px; font-size: 12px; margin-right: 10px;">share</button> <button id="luckysheet-share-btn-title" class="btn btn-primary btn-danger" style=" padding:3px 6px; font-size: 12px; margin-right: 10px;">show data</button>'
    // userMenuItem: true,
    // userInfo:'<i style="font-size:16px;color:#ff6a00;" class="fa fa-taxi" aria-hidden="true"></i> lemon',
    })
  }
})


// 시트 이름 저장
const store = useSheetStore();
const sheetName = ref(store.sheetItem.doc_name)

// 파일명 변경
const changeDocName = async() => {
  try {
    const {data} = await updateDocName(gridKey, sheetName.value);
    store.sheetItem.doc_name = data.data.newDocName
    alert(`파일명이 ${data.data.newDocName} 으로 변경되었습니다.`)
  } catch (error) {
    console.log(error)
  }  
}
</script>

<style scoped>
button {
  --bs-btn-padding-y: .25rem;
  --bs-btn-padding-x: .5rem;
  --bs-btn-font-size: .75rem;
}

#luckysheet {
  margin: 0px;
  padding: 0px;
  position: absolute;
  width: 100%;
  left: 0px;
  top: 30px;
  bottom: 0px;
}

#uploadBtn {
  font-size: 16px;
}

#tip {
  positiowqn: absolute;
  z-index: 1000000;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
}

.common {
  align-self: center;
  margin-left: 5px;
}
</style>
