import videoHomepage from '../../assets/video-homepage.mp4';
import icon from '../../assets/check-icon.svg';
const HomePage = (props) => {
    return(
        <div className="homepage-container">
           <video  autoPlay muted loop>
            <source 
                src={videoHomepage} 
                type="video/mp4"
            />
           </video>
           <div className='homepage-content'>
                <div className='title-1'>TẠO BÀI THI TRẮC NGHIỆM ONLINE
                MIỄN PHÍ VÀ DỄ SỬ DỤNG</div>
                <div className='title-2'>
                        <div> <img src={icon}></img> Nhiều tùy chọn trộn câu hỏi và tự động chấm bài làm</div>
                        <div>  <img src={icon}></img> Tạo bài thi lấy ngẫu nhiên từ ngân hàng câu hỏi trắc nghiệm của bạn</div>
                        <div> <img src={icon}></img> Triển khai thi online hoặc làm bài thi online không cần cài đặt ứng dụng</div>    
               </div>
                <div  className='title-3'>
                    <button>Đăng ký miễn phí</button>
                </div>
           </div>
        </div>
    )
}
export default HomePage;