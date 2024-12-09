const Introduction = ({ title, description, tel }) => {
    return (
        <>
            <div className="Introduction">
                <h3 dangerouslySetInnerHTML={{ __html: title }}></h3>
                <p className="txt" dangerouslySetInnerHTML={{ __html: description }}></p>
                <div className="tel">
                    <span>문의전화</span>
                    <p>{tel}</p>
                </div>
            </div>
        </>
    );
};

export default Introduction;
