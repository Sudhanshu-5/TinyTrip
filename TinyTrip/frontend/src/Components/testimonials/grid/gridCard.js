import React from 'react';
import './gridCard.css'

function gridCard(props) {
    return (
        <div className="test--card col-lg-4">
		    <div className={props.index%3===0?"test--card-wrapper rounded-corners-gradient-borders grd-1":props.index%3==1?"test--card-wrapper rounded-corners-gradient-borders grd-2":"test--card-wrapper rounded-corners-gradient-borders grd-3"}>
                <div className="test--card-box align-center">
	                <p className="mbr-text">
		                {props.data}
	                </p>
			    </div>
        		<div className="testimonials-blob"></div>
            	<div className="test--card-img">
                    <img decoding="async" alt="Testimonials theme" src={props.img} class="i-pic" />
        		</div>
        		<h4 className="test--card-title">{props.name}</h4>
        		<h3 className="test--card-sub-title">
        		    {props.position}
        		</h3>
			</div>
		</div>
    )
}

export default gridCard;

/*

<div class="container">
		<div class="row">
			<div class="test--card col-lg-4">
					<div class="test--card-wrapper rounded-corners-gradient-borders grd-1">
						<div class="test--card-box align-center">
							<p class="mbr-text">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas deleniti laborum eos molestias earum explicabo ad neque, cum quisquam quo hic quidem voluptatum ipsum! Nostrum veniam officia sint corrupti sequi.
							</p>
						</div>
						<div class="testimonials-blob"></div>
						<div class="test--card-img">
								<img decoding="async" alt="Testimonials theme" src="https://mobirise.com/extensions/eventamp/assets/images/face3.jpg" class="i-pic" />
						</div>
						<h4 class="test--card-title">Name</h4>
						<h3 class="test--card-sub-title">
							Title
						</h3>
				</div>
			</div>
			<div class="test--card col-lg-4">
				<div class="test--card-wrapper rounded-corners-gradient-borders grd-2">
					<div class="test--card-box align-center">
						<p class="mbr-text">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas deleniti laborum eos molestias earum explicabo ad neque, cum quisquam quo hic quidem voluptatum ipsum! Nostrum veniam officia sint corrupti sequi.
						</p>
					</div>
					<div class="testimonials-blob"></div>
					<div class="test--card-img">
							<img decoding="async" alt="Testimonials theme" src="https://mobirise.com/extensions/eventamp/assets/images/face3.jpg" class="i-pic" />
					</div>
					<h4 class="test--card-title">Name</h4>
					<h3 class="test--card-sub-title">
						Title
					</h3>
			</div>
		</div>
		<div class="test--card col-lg-4">
			<div class="test--card-wrapper rounded-corners-gradient-borders grd-3">
				<div class="test--card-box align-center">
					<p class="mbr-text">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas deleniti laborum eos molestias earum explicabo ad neque, cum quisquam quo hic quidem voluptatum ipsum! Nostrum veniam officia sint corrupti sequi.
					</p>
				</div>
				<div class="testimonials-blob"></div>
				<div class="test--card-img">
						<img decoding="async" alt="Testimonials theme" src="https://mobirise.com/extensions/eventamp/assets/images/face3.jpg" class="i-pic" />
				</div>
				<h4 class="test--card-title">Name</h4>
				<h3 class="test--card-sub-title">
					Title
				</h3>
		</div>
	</div>
		</div>
	</div>

*/