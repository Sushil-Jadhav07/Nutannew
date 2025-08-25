import Container from "@/components/shared/container";
import Marquee from "@/utils/marquee";
import React from "react";
import cn from "classnames";

const SectionMarquee: React.FC = () =>  {
    return (
        <div className={cn('bg-[#263c97] p-4')}>
            <Container className="2xl:max-w-[1700px] ">
                <Marquee speed={30} className="text-base text-brand-light ">
                      <span>
                        🌟 Umitex- Digital Store React NextJS Template
                      </span>
                    <span>
                    🌟 Umitex is a creative digital Store NextJS Template build with NextJS 15 and Tailwindcss.
                        </span>
                    <span>
                    🌟 You can send us email to support@ibigecommerce.com. We will process tickets and respond you to in the queue order.
                        </span>
                </Marquee>
            </Container>
        </div>
    )
}
export default SectionMarquee;
