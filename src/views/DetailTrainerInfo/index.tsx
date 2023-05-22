import { useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import CustomCarousel2 from '@/views/DetailTrainerInfo/components/Carousel';

export default function DetailTrainerInfo() {
  const location = useLocation();
  const trainerDetailUUID = location.state?.trainerDetailUUID;
  const trainer = useAppSelector((state) =>
    state.trainers.data.find((e) => e.uuid === trainerDetailUUID),
  );
  console.log('trainer', trainer);
  return (
    <div className="mx-auto mt-16  w-full justify-between max-w-container md:flex-row px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-24">
      <div className="grid grid-cols-2 ">
        <div className="grid grid-cols-1 gap-2">
          <div className="text-3xl font-bold">{trainer?.fullName || 'NoName'}</div>
          <div>{trainer?.yearExperience}+ years of experience</div>
          <div>
            {trainer?.introduction}
          </div>
          <div>
            <div className="text-2xl font-bold">Specialties</div>
            <ul>
              {trainer?.skills?.map((e,i) => (
                <li key={`skill-${i}`}>{e}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-2xl font-bold">Certified</div>
            <ul>
              <ol>Personal Training and Nutrition through – ETA College.</ol>
              <ol>ABS class certified – Virgin Active</ol>
              <ol>Grid class certified – Virgin Active</ol>
            </ul>
          </div>
        </div>
        <div>
          <div className="w-64">
            <CustomCarousel2 images={trainer?.avatars} />
          </div>
        </div>
      </div>
    </div>
  );
}
