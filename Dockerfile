FROM node:14-alpine as base

#==============================================
RUN echo '===== INSTALL ====='

FROM base AS install_node_modules

WORKDIR /home/app

COPY . /home/app

RUN npm install --production --loglevel verbose
RUN cp -R node_modules /tmp/prod_node_modules
RUN npm run iall

#==============================================
RUN echo '===== BUILD ====='

RUN npm run build

#==============================================
RUN echo '===== RELEASE ====='

FROM base AS release

WORKDIR /home/app

COPY --from=install_node_modules /home/app/dist /home/app/dist
COPY --from=install_node_modules /home/app/config /home/app/config
COPY --from=install_node_modules /home/app/package.json /home/app/

# copy production node_modules
COPY --from=install_node_modules /tmp/prod_node_modules /home/app/node_modules

EXPOSE 80
CMD [ "npm", "run", "start:docker" ]