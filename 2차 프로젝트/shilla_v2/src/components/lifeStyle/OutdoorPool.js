import React from 'react';
import Header from '../common/Header';
import Tab from "./Tab";
import SubTitle from './SubTitle';
import Gallery from './Gallery';
import Introduction from './Introduction';
import Location from './Location'
import TitDesc from './TitDesc';
import Card from './Card';
import Footer from '../common/Footer';

import "../../scss/common.scss"
import "../../scss/header.scss"
import "../../scss/footer.scss"
import "../../scss/sub-list.scss"
import "../../scss/sub-detail.scss"

function OutdoorPool() {

    const galleryImages = [
        "../../img/sub/urban-01.jpg",
        "../../img/sub/urban-02.jpg",
        "../../img/sub/urban-03.jpg",
        "../../img/sub/urban-04.jpg"
    ];

    const introData = {
        title: "격이 다른 아웃도어 라이프스타일 경험을 제공하는 어번 아일랜드",
        description: `어번 아일랜드(Urban Island)는 '도심 속 휴식의 섬' 컨셉의 야외 수영장입니다.<br/>
                      서울 특급호텔 최초 온수풀, 자쿠지, 루프탑(Rooftop), 카바나 등 차원이 다른 아웃도어 라이프 스타일을 즐기실 수 있습니다.<br/>
                      어번 아일랜드는 계절마다 색다른 테마로 방문하실 때마다 새로운 경험을 제공합니다.`,
        tel: "02-2230-3528~9",
    };

    const locationData = [
        { title: '위치', content: '서울신라호텔 3층' }
    ];

    const rules = [
        {
            title: "[운영방침]",
            rule: [
                '어번 아일랜드는 신라 피트니스 클럽 회원과 어번 아일랜드 이용 혜택이 포함된 투숙객 전용 시설입니다.',
                "어번 아일랜드 입장 혜택이 포함된 상품 외에는 이용 시 입장료가 추가로 부과됩니다. (단, 주말, 공휴일 및 성수기에는 수용 인원 마감에 따라 현장 유료 이용이 제한될 수 있습니다.)",
                "어번 아일랜드는 사전 예약이 불가합니다. (단, 카바나는 사전 예약 가능하며 02-2230-3528~9로 문의주시기 바랍니다.)",
                "어번 아일랜드와 실내 수영장은 별도로 운영되고 있습니다.",
                "쾌적하고 안전한 운영을 위해, 적정 인원 초과 시 입장이 제한될 수 있습니다.",
                "어번 아일랜드는 우천 시에도 정상 운영되나, 일부 선베드에 한해 우천 대비 설비가 갖추어져 있사오니 이용에 참고하시기 바랍니다. (단, 폭우나 강풍이 지속되어 고객의 안전이 우려되는 경우 어번 아일랜드 운영이 중단될 수 있습니다.)",
                "선베드는 객실당 2개씩 제공되며, 일부 선베드는 전용 패키지로 예약한 고객에게 우선 배정됩니다.",
                "어번 아일랜드의 모든 지역은 금연 구역입니다.",
                "어번 아일랜드 내 유모차 반입은 불가합니다.",
            ]
        },
        {
            title:"[안전]",
            rule: [
                "신장 140cm 미만인 고객은 성인 보호자의 보호 하에 구명조끼 착용 시 이용 가능합니다.",
                "다이빙은 금지되어 있습니다.",
                "물에 들어가기 전 반드시 준비운동을 해주시기 바랍니다.",
                "금속, 플라스틱, 유리제품 등 날카롭거나 깨질 수 있는 물건의 반입을 금합니다.",
                "강우 및 태풍, 한파 등과 같은 기상 상황에 따라 어번 아일랜드 이용이 제한될 수 있습니다.",
                "눈병, 피부병 및 기타 감염성 질환 등 공중 위생에 영향을 미치는 환자는 이용할 수 없습니다.",
                "수영장 소독물질이 알러지를 일으킬 수 있으니, 관련 알러지가 있는 고객은 이용을 삼가 주시기 바랍니다.",
                "안전한 이용을 위해 안전 요원 및 직원의 안내가 있을 경우 적극적으로 협조해 주시기 바랍니다.",
                "과도한 음주 상태 및 타 고객의 이용에 불편을 초래하는 고객의 경우 어번 아일랜드 입장 및 이용이 제한될 수 있습니다.",
            ]
        },
        {
            title:"[촬영]",
            rule: [
                "상업적 목적의 촬용 시 이용이 제한될 수 있습니다.",
                "휴대전화를 포함한 촬영 장비로 풀장 내 수중 촬영 및 락커 내에서의 촬영은 불가합니다.",
                "다른 고객에게 불편을 주는 지나친 촬영은 제재할 수 있으니 이에 협조 바랍니다.",
                "어번 아일랜드에서는 인터넷 방송을 진행할 수 없으며 초상권을 침해하는 행위로 간주되어 법적 제재를 받을 수 있습니다.",
            ]
        },
        {
            title:"[복장]",
            rule: [
                "어번 아일랜드에서는 수영복 대여 서비스를 제공하지 않습니다.",
                "풀(Pool) 이용은 수영복 착용 시에만 가능합니다.",
                "36개월 미만 유아는 수영복 및 방수 기저귀 착용시 이용 가능합니다.",
                "타인에게 상해를 입힐 수 있는 귀걸이, 머리핀, 반지 등의 착용은 삼가 주시기 바랍니다.",
                "신체에 문신이 있는 경우 문신이 노출되지 않도록 가린 후 (래시가드 착용 등) 이용해 주시기 바랍니다.",
            ]
        },
        {
            title:"[장비]",
            rule: [
                "지름 1m 이내 사이즈의 튜브만 반입이 허용되며, 키즈풀에서만 사용 가능합니다. (단, 목튜브는 안전을 위해 모든 풀장 내 사용을 제한합니다.)",
                "신장 140cm 미만인 고객을 위한 구명조끼를 무료로 대여해 드립니다.",
                "비치볼을 제외한 스노클 장비, 오리발, 수중 프로펠러, 물총 등 다른 고객에게 불편을 주는 장비 및 장난감류는 사용하실 수 없습니다.",
            ]
        },
        {
            title:"[식음료]",
            rule: [
                "외부 식음료의 반입은 삼가 주시기 바랍니다.",
                "식음료 주문은 운영 마감시간 및 중간 정비시간의 1시간 전까지 가능합니다. (단, 전복 한우 차돌박이 짬뽕 주문은 오후 12시부터 18시까지만 가능합니다.)",
                "특정 식음료에 알러지가 있는 경우, 주문 전 직원에게 반드시 알려주시기 바랍니다",
            ]
        },
        {
            title:"[에티켓]",
            rule: [
                "풀(Pool)에 들어가기 전 반드시 샤워를 해주시기 바랍니다.",
                "선탠 오일 등의 태닝 제품을 바르신 경우, 클렌징 후 풀(Pool)을 이용해 주시기 바랍니다.",
                "어번 아일랜드를 이용하는 주변 고객에게 불편을 주는 행위는 삼가 주시기 바랍니다.",
                "샤워실 및 탈의실 이용 시 만 4세 이상 어린이는 혼성 입장이 불가합니다.",
            ]
        },
    ];
    const cards = [
        { title: "야외 수영장", imgSrc: "../../img/sub/R00000009H4E_KR.jpg", description: "에메랄드 빛 야외 풀에서 최상의 휴식을 경험하실 수 있습니다." },
        { title: "카바나", imgSrc: "../../img/sub/R0000001CESG_KR.jpg", description: "어번 아일랜드 카바나가 최고의 휴식 공간을 제공합니다." },
        { title: "자쿠지", imgSrc: "../../img/sub/R00000009H4S_KR.jpg", description: "이국적인 분위기의 야외 자쿠지에서는 일상에 쌓인 스트레스를 해소시키며 평온한 시간을 즐길 수 있습니다." },
        { title: "루프탑", imgSrc: "../../img/sub/R00000009H4Z_KR.jpg", description: "남산의 정취를 느낄 수 있는 야외 루프탑 공간으로서 다양한 혜택과 함께 여유로운 휴식을 제공합니다." }
    ];

    return (
        <>
        <Header/>
        <div className="container">
            <div className="center">
                <div className="depth3-tab-wrap">
                    <Tab />
                    <div className="tab-contents">
                        <div className="tab-cont cont1 on">
                            <SubTitle />
                            <Gallery propImages={galleryImages} />
                            <div className="context">
                                <Introduction {...introData} />
                                <div class="info-wrap mt-0">
                                    <Location propLocation = {locationData}/>
                                    <TitDesc propRules={rules} />
                                </div>
                                <Card propCards={cards} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
        <Footer/>
        </>
    );
}

export default OutdoorPool;