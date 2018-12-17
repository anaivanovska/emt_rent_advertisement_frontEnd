import React, {Component} from 'react';
import {Carousel, CarouselItem, CarouselIndicators, CarouselControl } from 'reactstrap';
import './customCarousel.scss';

class CustomCarousel extends Component {
    state= {
        activeIndex: 0
    };

    next = () => {
        if(this.animating) return;
        const nextIndex =  this.state.activeIndex === this.props.images.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({
            activeIndex: nextIndex
        });
    };

    previous = () => {
        if(this.animating) return;
        const nextIndex =  this.state.activeIndex === 0 ? this.props.images.length -1 : this.state.activeIndex - 1;
        this.setState({
            activeIndex: nextIndex
        });
    };

    goToIndex = (newIndex) => {
       if(this.animating) return;
       this.setState({activeIndex: newIndex});
    };

    onExiting = () => {
        this.animating = true;
    };

    onExited = () => {
        this.animated = false;
    };


    mapImagesToCarouselItems = () => {
        return this.props.images.map((imageData, index) => {
            return (
                <CarouselItem
                    onExiting = {this.onExiting}
                    onExited = {this.onExited}
                    key={imageData.id}
                    className="carousel"
                >
                    {console.log(imageData)}
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

