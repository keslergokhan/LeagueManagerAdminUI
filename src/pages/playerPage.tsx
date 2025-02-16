import { PlayerTable } from "../components/playerComponents/playerTableComponent";
import { CmsCardBody } from "../components/shareds/cmsCardBody";
import { DefaultLayout } from "../layouts/defaultLayout";


export const PlayerPage = ():JSX.Element =>{
    return (
        <DefaultLayout>
            <CmsCardBody xlCol={12} xxlCol={12}>
                <PlayerTable></PlayerTable>
            </CmsCardBody>
        </DefaultLayout>
    );
}