<template>
    <v-row dense>
        <v-tabs
        class="elevation-2"
        dark
        grow
        :right="true"
        >

            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1" >
                English
            </v-tab>
            <v-tab
                href="#tab-2">
                Logic / Inductive Reasoning
            </v-tab>
            <v-tab
                href="#tab-3">
                Math
            </v-tab>

            <v-tab-item value="tab-1">
                <v-card flat tile >
                    <SettingsEnlish/>
                </v-card>
            </v-tab-item>
            <v-tab-item value="tab-2" >
                <v-card flat tile >
                    <SettingsLogic/>
                </v-card>
            </v-tab-item>
            <v-tab-item value="tab-3" >
                <v-card flat tile >
                    <SettingsMath/>
                </v-card>
        </v-tab-item>
      </v-tabs>
    </v-row>
</template>
<script>
import SettingsEnlish from './exam-settings/SettingsEnglish';
import SettingsMath from './exam-settings/SettingsMath';
import SettingsLogic from './exam-settings/SettingsLogic';
export default {
    name: 'ExamSettings',
    components: {
        SettingsEnlish,
        SettingsMath,
        SettingsLogic
    }
}
</script>