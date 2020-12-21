
import React,{useEffect, useState, useRef, useContext} from 'react';
import styled from 'styled-components'
import { Link, animateScroll as scroll } from "react-scroll";
import axios from'axios';
import { fontFamily, textColor, ColorRgb, Color } from '../theme';
import {FiUserCheck} from 'react-icons/fi'
import {MdDateRange} from 'react-icons/md'
import {BiPen} from 'react-icons/bi'
import SignatureCanvas from 'react-signature-canvas'
import Modal from 'react-awesome-modal';
import {AiOutlineSend} from 'react-icons/ai'
import UserContext from '../../context/UserContext'


function TableFour() {
    const [opacity, setOpacity] = useState("0");
    const [opacity2, setOpacity2] = useState("0");
    const [procent, setProcent] = useState('0');
    const [visible, setVisible] = useState(false);
    const [dataFinal, setData] = useState({});
    const [dataDetail, setDataDetal] = useState([]);
    const [FinalErrorText, setFinalErrorText] = useState("");
    let [sigCanvas, setSigCanvas] = useState({});
    let [trimmedDataURL, setTrimmedDataURL] = useState(null);

    const StyleContext = useContext(UserContext);
    
    useEffect(async () => {
      const result = await axios.get( 'http://192.168.88.78:3000/api/questions?page=1&pageSize=3' );
      const Data1 = result.data.data.docs[1]
      setData(Data1); setDataDetal(Data1.questiondetails);
    },[]);
    const openModal=()=> { setVisible(true);}
    const closeModal=()=> { setVisible(false);}

    const clear = () => sigCanvas.clear();
    const trim = () =>{ setTrimmedDataURL(sigCanvas.getTrimmedCanvas().toDataURL('image/png')) 
    setTimeout(()=>{ closeModal() },1000) };
        const clickHandles = (e) =>{
              console.log("dada");
              let finalOne = {};
              let finalEnd = {};
              let rs2 = document.querySelectorAll(".inpTest3");
              let arr2 = Array.from(rs2);
              let finalOne2 = [];

              arr2.map(element=>{
                  if(element.checked === true){
                    let soloObject2 = {}
                    let field = element.name;
                    let value = element.value;
                    soloObject2[field] = value;
                    finalOne2.push(soloObject2);
                  }
              });

              let rs4 = document.querySelectorAll(".getUserInp");
              let arr4 = Array.from(rs4);
              let userInp = {};
  
              arr4.map(element=>{
                  let field = element.name;
                  let value = element.value;
                  userInp[field] = value;
              });
              console.log(userInp, "userInp");
  
              finalOne["request"] = finalOne2;
              finalOne["name"] = userInp.name;
              finalOne["date"] = userInp.date;
              finalOne["signature"] = trimmedDataURL;
  
              finalEnd["PPS4"] = finalOne;

              console.log(finalEnd, "final one");

          }
//   console.log(trimmedDataURL, "signature url");
    return (
        <Component1 className="container" >
            <div className="boxShadow">
                <div className="rowHeader">4. Байгаль орчин, нийгмийн ерөнхий үнэлгээний маягт  <span className="tseg">*</span></div>
            <div className="formTwoParent ">
                <div className="headerPar">
                    <div  className="row" >
                      <div className="head1 col-md-5 col-sm-5 col-5">Шалгуур</div>
                      <div className="head2 col-md-2 col-sm-2 col-2"><div style={{borderBottom:"1px solid rgba(0,0,0,0.5)",paddingBottom:"10px"}} >Хариулт</div>
                          <div className="row">
                              <div style={{borderRight:"1px solid rgba(0,0,0,0.5)"}} className="col-md-6 col-md-6 col-md-6">Тийм</div>
                              <div className="col-md-6 col-md-6 col-md-6">Үгүй</div>
                          </div>
                      </div>
                      <div className="head2 col-md-2 col-sm-2 col-2">Асуулт Хариулт “Тийм” бол ДБ-ны холбогдох бодлого</div>
                      <div className="head2 col-md-3 col-sm-3 col-3"> <div style={{padding:"2px 15px"}}>“Тийм” бол шаардлагатай баримт бичгүүд </div> </div>
                    </div>
                </div>
                {tableData.map((el, i)=>{
                    return(
                    <div className="headerParchild" key={i}>
                        <div className="row" >
                        {/* <div className="number col-md-1 col-sm-1 col-1">{`${i + 1}`}</div> */}
                        <div className="texts col-md-5 col-sm-5 col-5"><div className="FirstPar"><div className="countPar">{i + 1}</div><div className="mainText">{el.name}</div> </div></div>
                        <div className="radios col-md-1 col-sm-1 col-1"><input className={`getinput22 inpTest3`} type="radio" name={i + 1} value="true"/></div>
                        <div className="radios col-md-1 col-sm-1 col-1"><input className={`getinput22 inpTest3`} type="radio" name={i + 1} value="false"/></div>

                        <div className="radios col-md-2 col-sm-2 col-2">{el.nameTwo}</div>
                        <div className="radios col-md-3 col-sm-3 col-3"><div style={{padding:"6px 15px"}}>{el.nameThree}</div></div>
                        </div>
                    </div>
                    )
                })}
                <div className="FinalBtn">
                    <div style={{opacity:`${opacity}`}} className="errtext">Таны асуулга {procent}% байна..</div>
                    <div style={{opacity:`${opacity}`}} className="errtext">Та гүйцэд бөгөлнө үү...</div>
                </div>

                <div className="UserRequestPar">
                        <div className="Title">Хүсэлт гаргагчийн мэдүүлэг :</div>
                        <div className="description">Би/Бид энэхүү маягтад өгсөн мэдээлэл нь үнэн зөв гэдгийг баталж байгаа бөгөөд худал, буруу мэдээлэл өгсөн нь санхүүгийн дэмжлэгийн шийдвэрт нөлөөлнө эсвэл санхүүгийн дэмжлэгийн шийдвэр, гэрээг цуцлах үндэслэл болно гэдгийг хүлээн зөвшөөрч байна. </div>
                        <div className="formOneParent">
                            <div className="inputPar">
                                <div className="inpChild">
                                    <div className="labels"><span>Мэдүүлэг бөглөгчийн нэр :</span> </div>
                                    <div className="name"> <FiUserCheck />
                                        <div className="form__group">
                                            <input type="input" className="getUserInp LoginInpName form__field" placeholder="Аж ахуйн нэр" name="name" required />
                                            <label for="name" className=" form__label">Бүтэн нэрээ оруулна уу</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="NextChild">

                                    <div className="inpChild next">
                                        <div className="labels"><span> Гарын үсэг зурсан огноо : </span></div>
                                            <div className="name"> <BiPen />
                                                <div className="form__group">
                                                    <div className="SignBtn" onClick={openModal} > Зурах </div>
                                                </div>
                                            </div>
                                    </div>

                                    <div className="inpChild next">
                                        <div className="labels"><span> Огноо :</span></div>
                                        <div className="name"> <MdDateRange />
                                            <div className="form__group">
                                                <input type="date" placeholder="өдөр-сар-жил" className="getUserInp LoginInpName form__field" placeholder="Регистерийн дугаар" name="date" required />
                                                <label for="password" className="form__label">Өдөр-Сар-Он </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {trimmedDataURL ? <img className="SingatureImg"  src={trimmedDataURL}/> : null}

                                <Modal visible={visible}  width="420" height="300"effect="fadeInDown" onClickAway={closeModal}>
                                    <div className="modalPar">
                                        <div className="Canvass">
                                            <SignatureCanvas className='sigCanvas' penColor='green' ref={(ref) => { sigCanvas = ref }} canvasProps={{width: 420, height: 200, className: 'sigCanvas'}} />
                                        </div>
                                        <div className="BtnPar">
                                            <button onClick={clear}>Цэвэрлэх</button>
                                            <button onClick={trim}>Хадгалах</button>
                                            <button onClick={closeModal}>X</button>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                        <div className="buttonPar">
                            <div style={{opacity:`${opacity2}`}} className="errtext">{FinalErrorText}</div>
                                {/* <div style={{opacity:`${opacity}`}} className="errtext">Та гүйцэд бөгөлнө үү...</div> */}
                                {/* <span onClick={clickHandles} className="TestButton">NEXT</span> */}
                            <button onClick={clickHandles} className="SubmitButton" type="button">Нэвтрэх<div className="flexchild"><AiOutlineSend/> <AiOutlineSend className="hide" /> <AiOutlineSend className="hide1" /></div></button>
                        </div>
                </div>
             </div>
            </div>
        </Component1>
    )
}

export default TableFour


const Component1 = styled.div`
    color:rgba(${textColor},0.9);
    transition: all 0.5s ease-out;
    font-family: ${fontFamily};
      .boxShadow{
        box-shadow:1px 1px 18px -5px;
        border-radius:6px;
          .rowHeader{
            border-radius:6px 6px 0px 0px;
            background-color:white;
            padding: 24px 26px;
            font-size:1.2rem;
            // border-bottom:1px solid rgba(63, 81, 181,0.5);
            color:black;
            .tseg{
              color:red;
            }
          }
        .formTwoParent{
            border-radius:0px 0px 6px 6px;
            background-color:white;
            padding-bottom:16px;
            margin-bottom:100px;
            font-size:15px;
    
            .UserRequestPar{
                margin-top:10px;
                padding:15px 40px;
                .Title{
                    font-size:16px;  
                    font-weight:500;
                    margin-bottom:10px;
                }
                .description{
                    margin-bottom:20px;
                }

                .inputPar{
                   border-top:1px solid rgba(${ColorRgb},0.5);
                   border-radius:8px;
                   display:flex;
                   flex-direction:column;
                   align-items:flex;
                   justify-content:center;
                   padding-top:15px;

                   .modalPar{
                       padding:5px 5px;
                      .Canvass{
                          border:1px solid rgba(${ColorRgb},0.5);
                      }
                       .BtnPar{
                          padding:0px 10px;
                          margin:20px 0px;
                          display:flex;
                          flex-direction:row;
                          align-items:center;
                          justify-content:space-between;
                          button{
                              font-weight:500;
                              color:rgba(${textColor},0.9);
                              cursor:pointer;
                              border-style:none;
                              border-radius:4px;
                              padding:6px 14px;
                              background-color:white;
                              box-shadow:1px 1px 8px -2px;
                          }
                       }
                   }
                   .SingatureImg{
                        margin:10px 0px;
                        border:1px solid rgba(${ColorRgb},0.3);
                        height:200px;
                        width:420px;
                   }
                   .NextChild{
                       display:flex;
                       flex-direction:row;
                       align-items:center;
                       justify-content:space-between;
                       .next{
                           width:40%;
                           .SignBtn{
                               cursor:pointer;
                               padding:5px 0px;
                               border-radius:6px;
                               width:100%;
                               color:rgba(${ColorRgb},0.8);
                               background-color:rgba(${ColorRgb},0.1);
                               cursor:pointer;
                               font-size:18px;
                               text-align:center;
                               box-shadow:1px 1px 8px -2px;
                               &:hover{
                                 box-shadow:1px 1px 10px -2px;
                               }
                           }
                       }
                   }
                   .inpChild{
                       margin:12px 0px;
                       display:flex;
                       flex-direction:column;
                       .labels{
                           display:flex;
                           flex-direction:row;
                           justify-content:space-between;
                           font-size:14px;
                           span{
                               color:rgba(${textColor},.9);
                               font-weight:500;
                           }
                          
                       }
                        .name{
                        display:flex;
                        flex-direction:row;
                        align-items:flex-end;
                        justify-content:flex-end;
                        width:100%;
                        svg{
                          color:rgba(${ColorRgb},0.7);
                          font-size:28px;
                          margin-right:15px;
                          margin-bottom:5px;
                        }
                        .form__group{
                         position:relative;
                         padding: 15px 0 0;
                         margin-top: 0px;
                         width: 100%;
                            .form__field{
                                font-family: inherit;
                                width: 100%;
                                border: 0;
                                border-radius:6px;
                                border-bottom: 1px solid rgba(${ColorRgb},0.4);
                                border-right: 1px solid rgba(${ColorRgb},0.4);
                                border-left: 1px solid rgba(${ColorRgb},0.4);
                                border-top: 1px solid rgba(${ColorRgb},0.4);
                                outline: 0;
                                font-size: 1rem;
                                color: black;
                                padding: 7px 0;
                                padding-left:10px;
                                font-size: 0.9rem;
                                background: transparent;
                                transition: border-color 0.2s;
                                transition:all 0.3s ease;
                                position: relative;
                                z-index: 1;
                                &::placeholder {
                                  color: transparent;
                                }
                                &:placeholder-shown ~ .form__label {
                                  font-size: 0.9rem;
                                  cursor: text;
                                  top: 24px;
                                }
                            }
                           
                            .form__label {
                                position: absolute;
                                top: 0;
                                display: block;
                                transition: 0.2s;
                                font-size: 0rem;
                                color: gray;
                                z-index: 0;
                                padding:0px 10px;
                                // background-color:black;
                              }
                              
                              .form__field{
                                  &:focus {
                                    ~ .form__label {
                                      position: absolute;
                                      top: 0;
                                      display: block;
                                      transition: 0.3s;
                                      font-size: 0.8rem;
                                      color: #11998e;
                                      font-weight:400;    
                                    }
                                    // border-bottom: 1px solid gray;
                                    border-right:none;
                                    border-left:none;
                                    border-top:none;
                                    padding-bottom: 7px;
                                    font-weight: 400;
                                    border-width: 1px;
                                    border-image: linear-gradient(to right, #11998e, #38ef7d);
                                    border-image-slice: 1;
                                  }
                              }
                              /* reset input */
                              .form__field{
                                &:required,&:invalid { box-shadow:none; }
                              }
                        }
                        
                      }
                   }
                }
            }
            .FinalBtn{
                margin:10px 10px;
              display:flex;
              flex-direction:row;
              align-items:center;
              justify-content:space-around;
              .errtext{
                font-weght:500;
                font-size:18px;
                transition:all 0.4s ease;
                color:rgba(255,0,0.6);
              }
            }
    
            .buttonPar{
              margin:10px 0px;
              display:flex;
              flex-direction:row;
              align-items:center;
              justify-content:space-between;
                .errtext{
                  font-weght:500;
                  font-size:18px;
                  transition:all 0.4s ease;
                  color:rgba(255,0,0.6);
                }

                .SubmitButton{
                    margin:10px 0px;
                    margin-bottom:10px;
                    border-style:none;
                    border-radius:6px;
                    cursor:pointer;
                    padding:5px 0px;
                    color:white;
                    background-color:${Color};
                    font-size:18px;
                    text-align:center;
                    transition:all 0.3s ease;
                    display:flex;
                    align-items:center;
                    justify-content:space-around;
                    border:1px solid rgba(63, 81, 181,0.5);
                    width:50%;
                    border-radius:6px;
                    .hide{
                      transition:all 0.3s ease;
                      transform:scale(0);
                      font-size:22px;
                    }
                    .hide1{
                      transition:all 0.7s ease;
                      transform:scale(0);
                      font-size:26px;
                    }
                    &:hover{
                      box-shadow:1px 1px 15px -2px black;
                      .hide{
                        transition:all 0.3s ease;
                        transform:scale(1);
                      }
                      .hide1{
                        transition:all 0.7s ease;
                        transform:scale(1);
                      }
                    }
                    .flexchild{
                      display:flex;
                      align-items:center;
                      justify-content:space-around;
                    }
                }
            }
            .headerPar{
              background-color: rgba(0, 51, 102,0.9);
              color:white;
              text-align:center;
              border-bottom:1px solid rgba(0,0,0,0.4);
              font-size:14px;
             
              .head1{
                padding-top: 10px;
                padding-bottom: 16px;
              }
              .head2{
                padding-bottom: 18px;
                border-left:1px solid rgba(0,0,0,0.4);
                padding:0px 0px;
                padding-top: 10px;
              }
            }
            .headerParchild{
              background-color: rgba(63, 81, 181,0.1);
              text-align:center;
              border-bottom:1px solid rgba(0,0,0,0.4);
              .FirstPar{
                  display:flex;
                  align-items:center;
                  height: 100%; 
                  .countPar{
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    height: 100%; 
                    min-height: 100%; 
                    line-height: 100%;
                    width:8%;
                    border-right:1px solid rgba(0,0,0,0.4);
                  }
                  .mainText{
                    width:92%;
                    padding-left:10px;
                  }
              }
              .number{
                font-weight:500;
                text-align:center;
                border-right:1px solid rgba(0,0,0,0.4);
                padding-top: 10px;
                padding-bottom: 10px;
              }
              .texts{
                text-align:start;
                padding-top: 8px;
                padding-bottom: 8px;
              }
              .radios{
                display:flex;
                align-items:center;
                justify-content:center;
                border-left:1px solid rgba(0,0,0,0.4);
                padding:0px 0px;
                input{
                  cursor:pointer;
                  height:24px;
                  width:24px;
                  transition:all 0.4s ease;
                  border-radius:50% !important;
                  opacity: 0.8;
                  ::-webkit-datetime-edit { 
                    font-size: 1.4rem;
                }
                  &:checked{
                    opacity: 1;
                    -webkit-transform: scale(1.25);
                    transform: scale(1.25);
                    // box-shadow: 1px 1px 5px -2px;
                    border-radius:50% !important;
                  }
                }
              }
            }
    
        }
      }

  @media only screen and (max-width:768px){
    .boxShadow{
        .formTwoParent{
            font-size:13px;
            .buttonPar{
                flex-direction: column;
                .errtext {
                    font-size:15px;
                    width:100%;
                }
                .SubmitButton{
                    width:100%;
                }
            }
            .headerPar{
                font-size:14px;
            }
            .headerParchild{
                font-size:13px;
            }
            .UserRequestPar{
                padding: 15px 15px;
                .inputPar{
                  .modalPar{
                    .BtnPar{
                      width:100%;
                      justify-content: center;
                      button{
                        margin-right:18px;
                      }
                    }
                  }
                    .NextChild{
                        flex-direction: column;
                        .next{ width:100%;}
                    }
                    .SingatureImg{
                        width:100%;
                    }
                }
            }
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

