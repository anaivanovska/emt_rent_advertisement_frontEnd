import React, {Component} from 'react';
import {Carousel, CarouselItem, CarouselIndicators, CarouselControl } from 'reactstrap';
import './custom_carousel.scss';

class CustomCarousel extends Component {
    state= {
        activeIndex: 0
    };

    next = () => {
        const nextIndex =  this.state.activeIndex === this.props.images.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({
            activeIndex: nextIndex
        });
    };

    previous = () => {
        console.log('previous');
        const nextIndex =  this.state.activeIndex === 0 ? this.props.images.length -1 : this.state.activeIndex - 1;
        console.log(nextIndex);
        this.setState({
            activeIndex: nextIndex
        });
    };

    goToIndex = (newIndex) => {
       if(this.animating) return;
       this.setState({activeIndex: newIndex});
    };



    mapImagesToCarouselItems = () => {
        return this.props.images.map((imageData, index) => {
            return (
                <CarouselItem
                    key={imageData.id}
                    className="carousel"
                >
                    <img className="carousel-image offset-sm-2" src={`data:image/png;base64,${imageData.image}`} alt={imageData.title}/>
                </CarouselItem>);
        });
    };


    render() {
        const {activeIndex} = this.state;
        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
                className="custom"
            >
                    {this.mapImagesToCarouselItems()}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />

            </Carousel>
        );
    }
}

export default CustomCarousel;

