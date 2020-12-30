import React, {useRef, useEffect, useCallback, useContext} from 'react';
import {useSpring, animated} from 'react-spring';
import styled from 'styled-components'
import ModalOne from '../modals/modalOne'
// import HelperContext from '../../../context/HelperContext'

export const Modal = ({showModal,setShowModal }) => {
    // const HelpContext = useContext(HelperContext);
    const modalRef = useRef();
    const animation = useSpring({
        config:{
            duration:250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateX(0%)` : `translateX(-100%)`
    });

    const closeModal = e =>{
       if(modalRef.current === e.target){
         setShowModal(false);
       }
    }
    
    const keyPress = useCallback(e=>{
        if(e.key === 'Escape' && showModal){
            setShowModal(false);
        }
    },[setShowModal, showModal]);
    
    useEffect(()=>{
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    },[keyPress]);

    return(
        <>
            {showModal ?
            (<Background ref={modalRef} onClick={closeModal}>
                <animated.div style={animation} >
                    <div className="modalPar container">
                        <div className="closeParent">
                            <button onClick={()=> setShowModal(prev => !prev)} > X </button>
                        </div>

                        <ModalOne />
                    </div>
                </animated.div>
            </Background>)
             : null}
        </>
    )
}
// https://www.youtube.com/watch?v=d3aI1Dt0Z50

const Background = styled.div`
    font-size:14px;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(0,0,0,0.5);
    position:fixed;
    display:flex;
    justify-content:end;
    align-items:center;
    z-index:1000;
    .modalPar{
        overflow-x:scroll;
        background-color:#fff;
        width:700px;
        height:100vh;
        padding:15px 15px;
        .closeParent{
            width:100%;
            text-align:end;
            button{
                padding:5px 10px;
                border-style:none;
                cursor:pointer;
                box-shadow:1px 1px 6px -2px;
            }
        }
    }
`



const tableData = [
    { name: "Дэд төслөөс байгаль орчин, нийгэмд эмзэг , олон янзын ба урьд өмнө байгаагүй ноцтой  сөрөг нөлөө үзүүлэхээр байгаа эсэх? Товч тодорхойлолт өгнө үү",
       nameTwo:"ҮАБ 4.01 Байгаль орчны үнэлгээ “A” ангилал",
      nameThree:"Байгаль орчин, нийгмийн  нөлөөллийн үнэлгээ  (БОННҮ)"},
  
    { name: "Нөлөөлөл үйл ажиллагаа явуулж буй газар эсвэл байгууламжийн гадна тусахаар байгаа эсэх, байгаль орчинд үзүүлэх сөрөг нөлөө нь нөхөн сэргээгдэхгүй байх эсэх? Товч тодорхойлолт өгнө үү:",
       nameTwo:"ҮАБ 4.01 Байгаль орчны үнэлгээ “A” ангилал",
      nameThree:"БОННҮ "},
  
    { name: "Төлөвлөж байгаа төсөл нь байгаль орчинд багахан эсвэл ямар ч сөрөг нөлөө үзүүлэхгүй байх эсэх? Товч үндэслэл тайлбар өгнө үү:",
       nameTwo:"OP 4.01 Байгаль орчны үнэлгээ “C” ангилал  ",
      nameThree:"Ерөнхий үнэлгээнээс өөр үйл ажиллагаа шаардлагагүй  "},
  
    { name: "Дэд төслийн байгаль орчин, нийгмийн нөлөөлөл бага байх, зөвхөн үйл ажиллагаа хэрэгжиж байгаа газарт тусах; эсвэл тухайн нөлөөлөл нь бага ч эргэн нөхөн сэргээгдэхгүй байх эсэх? Товч үндэслэл тайлбар өгнө үү:	",
       nameTwo:"OP 4.01 Байгаль орчны үнэлгээ “B” ангилал  ",
      nameThree:"БОННҮ эсвэл  Байгаль орчин, нийгмийн менежментийн төлөвлөгөө (БОНМТ) "},
  
    { name: "Төсөл нь соёлын биет нөөцөд сөрөг нөлөө үзүүлэх эсэх? Товч үндэслэл тайлбар өгнө үү:",
       nameTwo:"OP 4.11  Соёлын биет нөөц  ",
      nameThree:"БОННҮ-д авч үзсэн байх (Соёлын биет нөөцийн   менежментийн төлөвлөгөөг    оруулсан БОННҮ    ба/эсвэл төслийн явцад илрүүлсэн  биет олдворуудтай холбоотой журам)"},
  
    { name: "Төслийн үйл ажиллагаа гол чухал бус байгалийн амьдрах орчныг өөрчлөх эсвэл доройтуулах эсэх? Товч үндэслэл тайлбар өгнө үү: ",
       nameTwo:"OP 4.04 Байгалийн амьдрах орчин ",
      nameThree:"БОННҮ-д авч үзсэн байх  "},
  
    { name: "Төслийн үйл ажиллагаа нь гол чухал байгалийн амьдрах орчныг өөрчлөх эсвэл доройтуулах эсэх?  ",
       nameTwo:"OP 4.04 Байгалийн амьдрах орчин ",
      nameThree:"Авч үзэх боломжгүй "},
  
    { name: "Дэд төсөл нь шинээр далан барих эсвэл баригдсан ба барихаар төлөвлөж буй даланг ашиглах эсэх?   ",
       nameTwo:"OP 4.37 Далангийн аюулгүй байдал  ",
      nameThree:"Далангийн аюулгүй байдлыг хангах төлөвлөгөө "},
  
    { name: "Төсөл нь ямар нэг пестицид худалдаа хийх эсэх (төслөөр шууд эсвэл зээл олгох, хамтран санхүүжүүлэх замаар шууд бус хэлбэрээр эсвэл төрийн хамтрагч байгууллагын санхүүжилтээр дамжуулан), эсвэл пестицидийн худалдаа хийх төлөвлөгөөгүй ч хөнөөлт шавжийн менежментэд хор нөлөө үзүүлж болох эсэх?  ",
      nameTwo:"OP4.09 Хөнөөлт шавьжны менежмент ",
      nameThree:"БОННҮ-д авч үзсэн байх (Хөнөөлт шавьжны менежментийн төлөвлөгөө) "},
  
    { name: "Дэд төсөл нь албадан газар чөлөөлүүлэх, өмч хөрөнгийг алдагдуулах эсвэл орлого, амьжиргааны эх үүсвэрийг алдагдуулахад хүргэх эсэх? Товч үндэслэл тайлбар өгнө үү: ",
      nameTwo:"OP 4.12 Албадан нүүлгэн шилжүүлэлт ",
      nameThree:"Нүүлгэн шилжүүлэлт  (НШ)- ийн хураангуй төлөвлөгөө/ НШ-ийн төлөвлөгөө (Журмын талаарх  дэлгэрэнгүйг  Хавсралт C-ээс харна уу). "},
  
    { name: "Дэд төсөл хэрэгжих газарт цөөнхийн бүлэг амьдардаг ба төслийн үйл ажиллагаа тэдэнд сөрөг эсвэл эерэг нөлөө үзүүлэх эсэх? Товч үндэслэл тайлбар өгнө үү:  ",
      nameTwo:"ҮАБ 4.10 Уугуул иргэд  ",
      nameThree:"Нутгийн цөөнхи бүлэгт чиглэсэн  хөгжлийн төлөвлөгөө /Уугуул иргэдэд чиглэсэн төлөвлөгөө (Журмын талаарх дэлгэрэнгүйг Хавсралт B-ээс харна уу).  "},
  
    { name: "Төсөл нь ойтой холбоотой үйл ажиллагаа явуулснаар ойн эрүүл мэнд, чанарт нөлөөлөх эсвэл нутгийн иргэдийн эрх, сайн сайхан, бие даасан байдалд нөлөөлөх эсэх; эсвэл байгалийн ба таримал ойн менежмент, хамгаалал, ашиглалтыг өөрчлөхийг зорьж байгаа эсэх? Товч үндэслэл тайлбар өгнө үү: ",
      nameTwo:"ҮАБ4.36 Ойн аж ахуй ",
      nameThree:"БОННҮ-д авч үзсэн байх  "},
  
    { name: "Төсөл нь байгалийн гол чухал ой ба бусад амьдрах орчныг өөрчлөн хувиргах ба доройтуулах нөлөө үзүүлэх эсэх?   ",
      nameTwo:"OP4.36   Ойн аж ахуй ",
      nameThree:"Авч үзэх боломжгүй "},
  
    { name: "Дэд төсөл, түүнтэй холбоотой асуудал ба үйл ажиллагаанд хоёр ба түүнээс дээш тооны улс орнуудын хооронд ямар нэг газар нутгийн маргаан байгаа эсэх?  ",
      nameTwo:"ҮАБ 7.60 Маргаантай газруудад хэрэгжих төслүүд ",
      nameThree:"Тухайн улс орны төр засгийн газартай тохиролцох  "},
  
    { name: "Дэд төсөл, түүнтэй холбоотой асуудал ба үйл ажиллагаа, тэдгээрийн нарийвчилсан дизайн, инженерийн судалгаа нь олон улсын усан зам ашиглах, бохирдол үүсгэх, эсвэл тухайн замд байрлах эсэх?  ",
      nameTwo:"ҮАБ7.50 Олон улсын усан замын төслүүд  ",
      nameThree:"Мэдэгдэх, зарлах (эсвэл тухайн нөхцөлд авч үзэх зүйл) "},
  
  ];